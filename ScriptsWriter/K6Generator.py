import re
import json
import os
from haralyzer import HarParser
from typing import List, Dict, Any

class PerformanceGenerator:

    def __init__(self, username: str, password: str, domain: str) -> None:
        self.username   = username
        self.password   = password
        self.domain     = domain
        self.body       = []
     
    def har2k6(self, har_path: str, js_path: str) -> None:
        os.system(f"har-to-k6 {har_path} -o {js_path}")


    def read_base_file(self, path: str) -> None:

        with open(path, 'r') as file:
            self.body = file.readlines()

    def close_base_file(self) -> None:
        del self.body

    def write_script(self, name: str) -> None:
        
        with open(name, "w") as script:
            script.writelines(self.body)

    def one_line(self, regexs: List[str]) ->  None:
        combined_regex = re.compile("|".join(regexs))
        body = self.body
        modified_body = []
        erase_next_line = False

        for i, line in enumerate(body):
            if erase_next_line:
                erase_next_line = False
                continue

            match = re.search(combined_regex, line)
            if match:
                new_line = line.replace("\n", "") + re.sub(" {4,}", "", body[i + 1])
                erase_next_line = True
            else:
                new_line = line

            modified_body.append(new_line)

        self.body = modified_body

    def modfiy_domain(self) -> None:
        body = self.body
        modified_body = []

        for i, line in enumerate(body):
            if re.search('\.com', line):
                if re.search("(?<=')[^h].*\.com", line):
                    new_line = re.sub("(?<=')[^h].*\.com", "${Domain}", line)
                    new_line = new_line.replace("'", "`")
                else:
                    new_line = re.sub("(?<=\/\/).*\.com", "${Domain}", line)
                    new_line = new_line.replace("'", "`")
            else:
                new_line = line
            modified_body.append(new_line)

        self.body = modified_body

    def add_credentials(self) -> None:
        regex = re.compile("(?<=\/\/)(?=\${Domain})")
        modified_body = []
        auth_lines = f"// NTLM authentication\nlet Domain = '{self.domain}'\nlet username = '{self.username}';\nlet password = '{self.password}';\nusername = encodeURIComponent(username);\npassword = encodeURIComponent(password);\nconst credentials =" + r"`${username}:${password}`;" + "\n\n"

        for i, line in enumerate(self.body):

            if re.search(regex, line):

                new_line = line.replace("'", "`")
                new_line = re.sub(regex, '${credentials}@', new_line)

            else:

                new_line = line

            modified_body.append(new_line)

            if re.search(r"import .*'$", self.body[i - 1]) and re.search(r"^\n", line):

                modified_body.append(auth_lines)

        self.body = modified_body

    def add_auth(self) -> None:

        regex1 = re.compile("`\)\n")
        regex2 = re.compile("`,{")
        regex3 = re.compile("`, {")
        regexs = ["`,{", "`, {"]
        combined_regex = re.compile("|".join(regexs))
        modified = False
        body = self.body
        modified_body = []

        for i, line in enumerate(body):

            if re.search('response = http.', line) and re.search(regex1, line):

                new_line = re.sub(regex1, r"`, { auth: 'ntlm' });\n", line)  

            elif re.search('response = http.', line) and re.search(regex2, line):

                new_line = line.replace(",{", ",") 
                modified = True

            elif re.search('response = http.', line) and re.search(regex3, line):

                new_line = line.replace(", {", ",") 
                modified = True
            
            elif modified:

                new_line = line.replace("headers: {", "{ auth: 'ntlm', headers: {")
                modified = False

            else:

                new_line = line

            modified_body.append(new_line)

        self.body = modified_body
      
    def generate_access(self) -> None:

        self.modfiy_domain()
        self.add_credentials()
        self.add_auth() 

    def add_check_codes(self) -> None:
        check_output_function = (
            "\n\t\tlet checkOutput = (HTTPresponse, code) => {\n"
            "\t\t  let checks = {};\n"
            "\t\t  if (HTTPresponse.status === code) {\n"
            "\t\t    checks[`URL: ${HTTPresponse.url}`] = HTTPresponse.status === code;\n"
            "\t\t  } else {\n"
            "\t\t\tchecks[`URL: ${HTTPresponse.url} | Expected code: ${code} - Actual code: ${HTTPresponse.status}`] = false;\n"
            "\t\t  }\n"
            "\t\t  check(HTTPresponse, checks);\n"
            "\t\t}\n"
        )
        modified_body = []
        body = self.body
        regex = re.compile("(((    )|(' }))|( {4,}}))\)[;\n]")

        for i, line in enumerate(body):

            if re.search(regex, line):

                if not line.endswith(";"):

                    new_line = line.replace("\n", ";\n") + "\t\tcheckOutput(response, 000);\n"

                else:

                    new_line = line + "\t\tcheckOutput(response, 000);\n"

            else:

                new_line = line

            if re.search(r"group\(.*{\n", line):
                
                new_line = line + check_output_function + "\n"

            if "{ sleep, group }" in line:
                
                new_line = line.replace("{ sleep, group }", "{ sleep, group, check }")

            modified_body.append(new_line)

        self.body = modified_body


    def add_codes_in_checks(self, har_file: str) -> None:

        modified_body = []
        body = self.body
        with open(har_file, "r") as har:
            har_parser = HarParser(json.loads(har.read()))

        data = har_parser.har_data['entries']
        codes = [i["response"]["status"] for i in data]
        j = 0

        for line in body:

            if " 000)" in line:

                new_line = line.replace(" 000)", " " + str(codes[j]) + ")")
                j += 1

            else:

                new_line = line

            modified_body.append(new_line)

        self.body = modified_body


    def generate_check_codes(self, har_file: str) -> None:

        self.add_check_codes()
        self.add_codes_in_checks(har_file)

    def name_group(self, group_name: str) -> None:
        regex = "(?<=group\(')(.*)(?=',)"
        modified_body = []
        
        for line in self.body:
            match = re.search(regex, line)
            if match:
                new_line = line.replace(match.group(1), group_name)
            else:
                new_line = line

            modified_body.append(new_line)

        self.body = modified_body

    def add_ML_issues(self, ML_issues: List[Dict[str, Any]]) -> None:
        modified_body = self.body

        data = json.dumps(ML_issues, indent = 2)
        str_data = f"//Issue Data\nlet issues = {data}\n"
        add_chosen = "\nfunction RandomIssue(IssueList){\n"  \
            "  let randomIndex = Math.floor(Math.random() * IssueList.length);\n" \
            "  return IssueList[randomIndex];\n" \
            "}\n\n" \
            "let issue = RandomIssue(issues);\n" \
            "let IssueId = issue.IssueId;\n" \
            "let AgentId = issue.AgentId;\n" \
            "let IssueDate = issue.IssueDate;\n" \
            "let Tags = [];\n" \
            "for (let i = 0; i < Math.min(issue.Tags.length, 5); i++) {\n" \
            "  Tags.push(issue.Tags[i].tagId);\n}\n\n"\
            
        modified_body.pop(0)
        modified_body.pop(0)
        modified_body.insert(3, str_data)
        modified_body.insert(4, add_chosen)

        self.body = modified_body


    def generate_dates(self) -> None:
        modified_body = self.body

        dates_function = "// Function to obtain the dates for timeline and sensors\n" \
        "function generateDates(AlertingDate) {\n" \
        "const dateNow = new Date();\n" \
        "const dateAlert = new Date(AlertingDate);\n" \
        "const timeDiff = dateNow.getTime() - dateAlert.getTime();\n" \
        "const weekDiff = timeDiff / (1000 * 60 * 60 * 24 * 7);\n\n" \
        "let StartTrend, EndTrend, StartTimeLine, EndTimeLine;\n\n" \
        "if (weekDiff >= 5) {\n" \
        "    StartTrend = new Date(dateAlert.getTime() - (4 * 7 * 24 * 60 * 60 * 1000)).toISOString();\n" \
        "    EndTrend = new Date(dateAlert.getTime() + (1 * 7 * 24 * 60 * 60 * 1000)).toISOString();\n" \
        "    StartTimeLine = new Date(dateAlert.getTime() - (9 * 7 * 24 * 60 * 60 * 1000)).toISOString();\n" \
        "    EndTimeLine = new Date(dateAlert.getTime() + (6 * 7 * 24 * 60 * 60 * 1000)).toISOString();\n" \
        "} else if (weekDiff > 1) {\n" \
        "    StartTrend = new Date(dateAlert.getTime() - (4 * 7 * 24 * 60 * 60 * 1000)).toISOString();\n" \
        "    EndTrend = new Date(dateAlert.getTime() + (1 * 7 * 24 * 60 * 60 * 1000)).toISOString();\n" \
        "    StartTimeLine = new Date(dateNow.getTime() - (15 * 7 * 24 * 60 * 60 * 1000)).toISOString();\n" \
        "    EndTimeLine = dateNow.toISOString();\n" \
        "} else {\n" \
        "    StartTrend = new Date(dateAlert.getTime() - (4 * 7 * 24 * 60 * 60 * 1000)).toISOString();\n" \
        "    EndTrend = dateNow.toISOString();\n" \
        "    StartTimeLine = new Date(dateNow.getTime() - (15 * 7 * 24 * 60 * 60 * 1000)).toISOString();\n" \
        "    EndTimeLine = dateNow.toISOString();\n" \
        "}\n\n" \
        "return {\n" \
        "    StartTrend: StartTrend,\n" \
        "    EndTrend: EndTrend,\n" \
        "    StartTimeLine: StartTimeLine,\n" \
        "    EndTimeLine: EndTimeLine,\n" \
        "};\n" \
        "}\n" \
        "const { StartTrend, EndTrend, StartTimeLine, EndTimeLine } = generateDates(IssueDate);\n\n"

        modified_body.insert(5, dates_function)
        self.body = modified_body

    def replace_issue(self):
        regex_issue = "(?<=/)[a-z\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}(?=/|`)"
        regex_agent = "(?<=\"apmvAgentId\":)\d{1,}(?=,)|(?<=\"apmvAgentIds\":\[)\d{1,}(?=\],)"
        regex_tags = "(?<=\"sensorIds\":)\[.*\](?=},)"
        regex_startTrend = "(?<=\"startTime\":\").*(?=\",)"
        regex_endTrend = "(?<=\"endTime\":\").*(?=\")"
        regex_startTimeLine = "(?<=\?startTime=).*(?=&)"
        regex_endTimeLine = "(?<=&endTime=).*(?=`)"

        modified_body = []

        for i, line in enumerate(self.body):

            if re.search(regex_issue, line):

                line = re.sub(regex_issue, "${IssueId}", line)

            if re.search(regex_agent, line):

                line = re.sub(regex_agent, "${AgentId}", line)
                line = line.replace("'", "`")

            if re.search(regex_tags, line):

                line = re.sub(regex_tags, "[${Tags}]", line)
                line = line.replace("'", "`")

            if re.search(regex_startTrend, line):

                line = re.sub(regex_startTrend, "${StartTrend}", line)
                line = line.replace("'", "`")

            if re.search(regex_endTrend, line):

                line = re.sub(regex_endTrend, "${EndTrend}", line)
                line = line.replace("'", "`")

            if re.search(regex_startTimeLine, line):

                line = re.sub(regex_startTimeLine, "${StartTimeLine}", line)
                line = line.replace("'", "`")
    
            if re.search(regex_endTimeLine, line):

                line = re.sub(regex_endTimeLine, "${EndTimeLine}", line)
                line = line.replace("'", "`") 

            modified_body.append(line)

        self.body = modified_body


    # def replace_agent(self):
        
    #     regex_agent = "(?<=\"apmvAgentId\":)\d{1,}(?=,)|(?<=\"apmvAgentIds\":\[)\d{1,}(?=\],)"
    #     modified_body = []

    #     for i, line in enumerate(self.body):

    #         if re.search(regex_agent, line):

    #             new_line = re.sub(regex_agent, "${AgentId}", line)

    #         else:

    #             new_line = line

    #         modified_body.append(new_line)

    #     self.body = modified_body

    # def replace_tags(self):

    #     regex_tags = "(?<=\"sensorIds\":)\[.*\](?=},)"
    #     modified_body = []

    #     for i, line in enumerate(self.body):

    #         if re.search(regex_tags, line):

    #             new_line = re.sub(regex_tags, "${Tags}", line)
            
    #         else:

    #             new_line = line

    #         modified_body.append(new_line)

    #     self.body = modified_body

    # def replace_startTrend(self):
    #     regex_startTrend = "(?<=\"startTime\":\").*(?=\",)"
    #     modified_body = []

    #     for i, line in enumerate(self.body):

    #         if re.search(regex_startTrend, line):

    #             new_line = re.sub(regex_startTrend, "${StartTrend}", line)

    #         else:

    #             new_line = line

    #         modified_body.append(new_line)
        
    #     self.body = modified_body

    # def replace_endTrend(self):
    #     regex_endTrend = "(?<=\"endTime\":\").*(?=\")"
    #     modified_body = []

    #     for i, line in enumerate(self.body):

    #         if re.search(regex_endTrend, line):

    #             new_line = re.sub(regex_endTrend, "${EndTrend}", line)

    #         else:

    #             new_line = line

    #         modified_body.append(new_line)
        
    #     self.body = modified_body

    # def replace_startTimeLine(self):
    #     regex_startTimeLine = "(?<=\"startTime\":\").*(?=\",)"
    #     modified_body = []

    #     for i, line in enumerate(self.body):

    #         if re.search(regex_startTimeLine, line):

    #             new_line = re.sub(regex_startTimeLine, "${StartTimeLine}", line)

    #         else:

    #             new_line = line

    #         modified_body.append(new_line)
        
    #     self.body = modified_body


    # def replace_endTimeLine(self):
    #     regex_endTimeLine = "(?<=&endTime=).*(?=`)"
    #     modified_body = []

    #     for i, line in enumerate(self.body):

    #         if re.search(regex_endTimeLine, line):

    #             new_line = re.sub(regex_endTimeLine, "${EndTimeLine}", line)

    #         else:

    #             new_line = line

    #         modified_body.append(new_line)
        
    #     self.body = modified_body

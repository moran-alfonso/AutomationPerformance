import os
import re
import json

from haralyzer import HarParser


from typing import List



class Writer:

    def __init__(self, username: str, password: str, domain: str) -> None:
        self.username   = username
        self.password   = password
        self.domain     = domain
        self.body       = []
     
    def har2k6(self, har_path: str, js_path: str) -> None:
        os.system(f"har-to-k6 {har_path} -o {js_path}")


    def read_base_file(self, path: str) -> None:
        base   = open(path, "r")
        self.raw    = base.readlines()
        self.body   = self.raw
        base.close()

    def close_base_file(self) -> None:
        self.base.close()

    def replace_str(self, old_str: str, this: str, with_this: str) -> str:
        return old_str.replace(this, with_this)
    
    def replace_regex(self, old_str: str, this: str, with_this: str) -> str:
        return re.sub(re.compile(this), with_this, old_str)
    
    def find_pattern(self, regex: str, where: str) -> bool:
        pattern = re.compile(regex)
        return bool(re.search(pattern, where))

    def write_script(self, name: str):
        script = open(name, "w")
        script.writelines(self.body)
        script.close()


    def one_line(self, regex: str) -> None:
        body = self.body
        modified_body = []
        erase_next_line = False

        for i, line in enumerate(body):

            if erase_next_line:
                erase_next_line = False
                continue

            if self.find_pattern(regex, line):

                new_line = self.replace_str(line, "\n", "") + self.replace_regex(body[i +  1], " {4,}", "")
                erase_next_line = True

            else:

                new_line = line

            modified_body.append(new_line)
        
        self.body = modified_body

    def one_line_multiple(self, regexs: List[str]) ->  None:

        for regex in regexs:

            self.one_line(regex)

    def modfiy_domain(self) -> None:
        body = self.body
        modified_body = []

        for i, line in enumerate(body):

            if self.find_pattern(".com", line):

                if self.find_pattern("(?<=')[^h].*\.com", line):

                    new_line = self.replace_regex(line,"(?<=')[^h].*\.com", self.domain)

                else:

                    new_line = self.replace_regex(line, "(?<=\/\/).*\.com", self.domain)

            else:

                new_line = line
            
            modified_body.append(new_line)

        self.body = modified_body

    def add_credentials(self) -> None:
        regex = re.compile("\/\/(.*.)com")
        modified_body = []
        auth_lines = f"// NTLM authentication\nlet username = '{self.username}';\nlet password = '{self.password}';\nusername = encodeURIComponent(username);\npassword = encodeURIComponent(password);\nconst credentials =" + r"`${username}:${password}`;" + "\n\n"

        for i, line in enumerate(self.body):

            if self.find_pattern('response = http', line):

                new_line = self.replace_str(line, "'", "`")
                new_line = re.sub(regex, r'//${credentials}@' + re.findall(regex, new_line)[0], new_line)

            else:

                new_line = line

            modified_body.append(new_line)

            if self.find_pattern("import .*'$", self.body[i - 1]) and self.find_pattern("^\n", line):

                modified_body.append(auth_lines)

        self.body = modified_body

    def add_auth(self) -> None:

        regex1 = re.compile("`\)\n")
        regex2 = re.compile("`,{")
        regex3 = re.compile("`, {")
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

        check_output_function = "\n\t\tlet checkOutput = (HTTPresponse, code) => {\n\t\t  let checks = {};\n\t\t  if (HTTPresponse.status === code) {\n\t\tchecks[`URL: ${HTTPresponse.url}`] = HTTPresponse.status === code;\n\t\t  } else {\n\t\t\t\tchecks[`URL: ${HTTPresponse.url} | Expected code: ${code} - Actual code: ${HTTPresponse.status}`] = false;\n\t\t  }\n\t\t  check(HTTPresponse, checks);\n\t\t}\n"
        modified_body = []
        body =  self.body
        regex = re.compile("(((    )|(' }))|( {4,}}))\)[;\n]")

        for i, line in enumerate(body):

            if self.find_pattern(regex, line):

                if not self.find_pattern(";$", line):

                    new_line = self.replace_regex(line, "\n", ";\n") + "\t\tcheckOutput(response, 000);\n"

                else:

                    new_line = line + "\t\tcheckOutput(response, 000);\n"

            else:

                new_line = line

            if self.find_pattern("group\(.*{\n", line):
                
                new_line = line + check_output_function + "\n"

            if self.find_pattern("{ sleep, group }", line):
                
                new_line = self.replace_str(line, "{ sleep, group }", "{ sleep, group, check }")

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
        regex = re.compile(" 0{3}\)")

        for line in body:

            if self.find_pattern(regex, line):

                new_line = self.replace_regex(line, regex, " " + str(codes[j]) + ")")
                j += 1

            else:

                new_line = line

            modified_body.append(new_line)

        self.body = modified_body


    def generate_check_codes(self, har_file: str) -> None:

        self.add_check_codes()
        self.add_codes_in_checks(har_file)

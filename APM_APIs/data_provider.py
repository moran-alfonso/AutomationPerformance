import urllib3
import requests
from requests_ntlm import HttpNtlmAuth


from typing import List
urllib3.disable_warnings()


class APM_APIs:

    def __init__(self, username: str, password: str, domain: str) -> None:
        self.username   = username
        self.password   = password
        self.domain     = domain
        self.session    = requests.Session()
        self.session.auth = HttpNtlmAuth(username, password)
        self.issues = []
        self.filtered_issues = []
        self.alerts =[]
        self.tag_rankings = []


    def all_issues(self, site_id: int, types: List[int] = [1, 2, 3, 4], status: List[int] = [0, 1, 2, 3]) -> dict | None:

        URL = f"https://{self.domain}/dataprovider/api/public/v1/issues"
        data = {
                "objectId": site_id,
                "issueType": types,
                "queryStartIndex": 0,
                "queryEndIndex": 1000,
                "issueStatus": status
                }
        try:
            response = self.session.post(URL, json=data, verify=False)
            response.raise_for_status() # raise exception for 4xx and 5xx errors
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            self.issues = []
            return None
    
        self.issues = response.json()["issues"]
        return response.json()["issues"]
    
    def all_alerts(self) -> list | None:

        URL = f"https://{self.domain}/dataprovider/api/public/v1/alert/alerts"

        try:
            response = self.session.get(URL, verify = False)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            self.alerts = []
            return None
    
        self.alerts = response.json()
        return response.json()
    
    def all_tag_rankings(self) -> list | None:

        URL = f"https://{self.domain}/dataprovider/api/public/v1/alert/tag-rankings"

        try:
            response = self.session.get(URL, verify = False)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            self.tag_rankings = []
            return None
    
        self.tag_rankings = response.json()
        return response.json()
    
    def get_data(self, site_id: int, types: List[int] = [1, 2, 3, 4], status: List[int] = [0, 1, 2, 3]) -> None:
        self.all_issues(site_id, types, status)
        self.all_alerts()
        self.all_tag_rankings()
        self.filter_issues(self.issues)
    
    def ML_data(self, ML_type: str) -> list:
        ML_issues = self.filtered_issues[ML_type]
        ML_data = []

        for issue in ML_issues:

            ML_data.append(
                            {"IssueId": issue["issueId"],
                            "AlertId": None,
                            "ML_type": None,
                            "Tags": []}
                        )

        for issue_dict in ML_data:

            for alert in self.alerts:

                if issue_dict["IssueId"] == alert["fkApmvIssue"]:

                    issue_dict["AlertId"] = alert["alertId"]
                    issue_dict["ML_type"] = alert["mlAgentTypeString"]
                    issue_dict["Tags"] = [{"tagId": tag["tagRankingsId"], 
                                           "SensorName": tag["sensorName"], 
                                           "Contribution": tag["percent"]} for tag in self.tag_rankings if tag["fkAlertId"] == alert["alertId"]]
                    
            issue_dict["Tags"].sort(key =  lambda x: x["Contribution"], reverse = True)

        return ML_data
            

    def filter_issues(self, issues: dict, filter: str = None) -> dict | list:
        

        ready_issues = {
                            "Anomaly": [],
                            "Failure": [],
                            "RP-CM": [],
                            "BYOM": []
                          }
        

        for issue in issues:

            if issue['issueType'] == 1:

                ready_issues["Anomaly"].append(issue)

            elif issue['issueType'] == 2:

                ready_issues["Failure"].append(issue)

            elif issue['issueType'] == 3:

                ready_issues["RP-CM"].append(issue)

            elif issue['issueType'] == 4:

                ready_issues["BYOM"].append(issue)

            else:

                pass

        self.filtered_issues = ready_issues

        if filter:

            ready_issues = ready_issues[filter]


        return ready_issues
   
    def filter_ML_data(self, ml_data: List, filter: str) -> list:

        if filter == "Normal":
            Ml_filtered_data = [item for item in ml_data if item["ML_type"] not in ["Maestro", "EXTERNAL_ML_AGENT"]]

        elif filter in ["Maestro", "EXTERNAL_ML_AGENT"]:
            Ml_filtered_data = [item for item in ml_data if item["ML_type"] == filter]

        else: 
            Ml_filtered_data = []

        return Ml_filtered_data

    def all_filtered_ML_data(self, ml_data: List) -> dict:

        ML = {"Normal": [],
              "Maestro": [],
              "External": []}
        
        ML["Normal"] = self.filter_ML_data(ml_data, "Normal")
        ML["Maestro"] = self.filter_ML_data(ml_data, "Maestro")
        ML["External"] = self.filter_ML_data(ml_data, "EXTERNAL_ML_AGENT")

        return ML
        





    #### ML (anomaly / Failure) agents sí tiene sesnores
    ### BYOM agents no tiene sensores
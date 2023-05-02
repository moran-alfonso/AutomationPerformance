import urllib3
import requests
from requests_ntlm import HttpNtlmAuth


from typing import List, Dict, Any
urllib3.disable_warnings()


class APIs:

    def __init__(self, username: str, password: str, domain: str) -> None:
        """
        Initialization for the new class APM_APIs instance

        Arguments
        - username (str): The username to access to the API or server
        - password (str): The password related to the username
        - domain (str): The server domain where the API is running  

        """
        self.username   = username
        self.password   = password
        self.domain     = domain
        self.session    = requests.Session()
        self.session.auth = HttpNtlmAuth(username, password)
        self.issues = []
        self.filtered_issues = []
        self.alerts =[]
        self.tag_rankings = []


    def all_issues(self, site_id: int, types: List[int] = None, status: List[int] = None) -> List[Dict[str, Any]] | None:

        """
        It retrieves the selected issues from the server.

        Arguments
        - site_ide (int): it is the id for the Site which you want to retrieve the infotmation for this endpoint.
        - types (list): it is a list of the issue types available, by default it retrieves all issue types, but you can adjust according what you want:
                1: Anomaly
                2: Failure
                3: CM or RP
                4: Custom (BYOM)
        - status (list): is a list of the issue status available, by default it retrieves the active issues, but you cand adjust according what you want:
                0: Open
                1: In Review
                2: Validated
                3: Planned
                4: Closed   

        Return
        If the request is successful the output will be a List of diccitionaries, each element represent an issue, this is the example if the 
                response has one element:
                [
                    {'issueId': '6578c107-800d-4a8b-b8a5-1b09c2332f5f',
                    'assetId': 'COMPFAN04',
                    'alertName': 'External DAA- COMPFAN04 -AA',
                    'issueType': 1,
                    'date': '2023-02-23T00:05:00.000Z',
                    'issueStatus': 0,
                    'lastProbability': 0.09575772285461426,
                    'criticality': 2,
                    'severity': 4,
                    'priority': 2}
                ]

        """

        if types is None:
            types = [1, 2, 3, 4]

        if status is None:
            status = [0, 1, 2, 3]
        
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
            return None
    
        self.issues = response.json()["issues"]
        return response.json()["issues"]
    
    def all_alerts(self) -> List[Dict[str, Any]] | None:

        """
        It retrieves all the alerts from the server.

        Return
        If the request is successful the output will be a List of diccitionaries, each element represent an alert, this is the example if the 
                response has one element:
                [
                    {'epochStartDate': 1677045900000,
                    'epochEndDate': None,
                    'apmvState': 0,
                    'apmvMLAgentCategoryString': 'Maestro',
                    'problemExpectedDate': '2023-02-28T22:05:00.000Z',
                    'apmvId': 1,
                    'alertId': 15,
                    'fkConnectionId': 1,
                    'fkLiveAgentId': 43,
                    'severity': 1,
                    'workTitle': 'CBM Event: Machine Learning Alert for Maestro - COMPFAN02',
                    'workDescription': 'Machine Learning Alert Detected\r\n\r\nAgent Name: Maestro - COMPFAN02\r\nAlert Severity: Low\r\nMachine Learning Agent: Maestro -[COMPFAN02]\r\nMachine Name: AZAPMMTELL16 \r\nAgent Trigger Date: 2/22/2023 12:05:00 AM - (UTC-06:00) Guadalajara, Mexico City, Monterrey\r\nAgent Trigger Mode: Backfill\r\nML Result - Top 10 Sensors:\r\n\t73.98% A1113C - C3 IN STABILIZER C3C4 \r\n\t26.02% A1113D - IC4 IN STABILIZER C3C4 \r\n\r\n\r\nReliability Characteristics\r\nFailure Class: \r\nProblem Code: \r\nCause Code: \r\nRemedy Code: \r\n\r\nCorrective Actions:  ',
                    'startDate': '2023-02-22T06:05:00.000Z',
                    'originalStatus': 0,
                    'endDate': None,
                    'lastTriggerDate': '2023-04-02T00:45:00.000Z',
                    'acked': False,
                    'ackDate': None,
                    'ackedByName': None,
                    'ackedByUserRowId': None,
                    'ackComments': None,
                    'state': 1,
                    'closedMode': 3,
                    'closedByName': None,
                    'closeByUserRowId': None,
                    'deploymentStatus': 1,
                    'isFailure': False,
                    'interventionType': 0,
                    'interventionNotes': None,
                    'avgLeadTime': 5760000000000,
                    'updating': False,
                    'latestUpdate': '2023-04-04T05:55:31.147Z',
                    'liveAgentName': 'Maestro - COMPFAN02',
                    'liveAgentTypeString': 'MachineLearning',
                    'mlAgentCategoryString': 'FAILURE_AGENT',
                    'mlAgentTypeString': 'Maestro',
                    'siteName': 'Houston',
                    'assetId': 'COMPFAN02',
                    'siteId': 'Houston',
                    'hasCompleteProbabilityTrends': False,
                    'apmvObject': None,
                    'apmvLiveAgent': None,
                    'apmvTagRankings': [],
                    'validatedDate': None,
                    'validatedComment': None,
                    'validatedByName': None,
                    'plannedDate': None,
                    'plannedComment': None,
                    'plannedByName': None,
                    'apmvObjectId': 22,
                    'apmvLiveAgentId': 23,
                    'liveAgentType': 3,
                    'assetName': 'Compressor 2 Fan Cooler Unit',
                    'enterpriseId': 1,
                    'disabled': False,
                    'fkApmvIssue': '9decf86a-1fe8-45d8-bafe-a1f9f6d23dac',
                    'apmvIssue': None,
                    'assetCriticality': 1,
                    'siteCodeHash': '1-0000000100000001'}
                ]
        """

        URL = f"https://{self.domain}/dataprovider/api/public/v1/alert/alerts"

        try:
            response = self.session.get(URL, verify = False)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            return None
    
        self.alerts = response.json()
        return response.json()
    
    def all_tag_rankings(self) -> List[Dict[str, Any]] | None:

        """
        It retrieves all the tag ranking from the server.

        Return        
        If the request is successful the output will be a List of diccitionaries, each element represent a tag ranking, this is the example if the 
                response has one element:
                [
                    {'apmvId': 1,
                    'tagRankingsId': 27,
                    'fkAlertId': 10,
                    'fkTagReferenceId': 313,
                    'fkConnectionId': 1,
                    'sensorName': 'Year10PercentNoise',
                    'sensorRole': 'sensor00000000044444',
                    'sensorDescription': 'Year10PercentNoise',
                    'percent': 1.0,
                    'apmvAlertId': 9,
                    'latestUpdate': '2023-02-23T17:31:55.337Z',
                    'apmvAlert': None,
                    'siteCodeHash': '1-0000000100000001'}
                ]
        """

        URL = f"https://{self.domain}/dataprovider/api/public/v1/alert/tag-rankings"

        try:
            response = self.session.get(URL, verify = False)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            return None
    
        self.tag_rankings = response.json()
        return response.json()
    
    def filter_issues(self, issues: List[Dict[str, Any]], issue_type: str = None) -> dict | List[Dict[str, Any]]:

        """
        This method groups the issues based on their type. 

        Arguments
        - issues (dict[list]): These are the issue to filter.
        - issue_type (str): it is the keyword to filter the issues.

        Return
        If you provide a type in issue_type input, the you got a list of those issues, if not 
        the you get a dict with all types.
        """
        
        ready_issues = {
                            "Anomaly": [],
                            "Failure": [],
                            "RP-CM": [],
                            "Custom": []
                          }
        
        if not issues:
            return ready_issues if not issue_type else []
        
        for issue in issues:

            issue_type_value = issue.get("issueType")

            if issue_type_value == 1:
                ready_issues["Anomaly"].append(issue)

            elif issue_type_value == 2:
                ready_issues["Failure"].append(issue)

            elif issue_type_value == 3:
                ready_issues["RP-CM"].append(issue)

            elif issue_type_value == 4:
                ready_issues["Custom"].append(issue)

        self.filtered_issues = ready_issues

        if issue_type:
            return ready_issues.get(issue_type, [])

        return ready_issues
    
    def get_data(self, site_id: int, types: List[int] = None, status: List[int] = None) -> None:

        """
        This method retrieves data for a given site_id, optionally filtering by issue types and issue status.

        Arguments
        - site_id (int): An integer representing the ID of the site to retrieve data for.
        - types (list): A list of integers representing the issue types to retrieve (1 = Anomaly, 2 = Failure, 3 = RP-CM, 4 = Custom).
        - status (list): A list of integers representing the issue status to retrieve (0 = Open, 1 = In Review, 2 = Validated, 3 = Planned, 4 = Closed).

        Return
        None. The retrieved data is stored in the following attributes of the APM_APIs instance:
                 - self.issues: A list of dictionaries representing the issues for the given site_id.
                 - self.alerts: A list of dictionaries representing the alerts.
                 - self.tag_rankings: A list of dictionaries representing the tag rankings.
                 - self.filtered_issues: A dictionary representing the issues for the given site_id, grouped by issue type.
        """

        if types is None:
            types = [1, 2, 3, 4]

        if status is None:
            status = [0, 1, 2, 3]

        self.all_issues(site_id, types, status)
        self.all_alerts()
        self.all_tag_rankings()
        self.filter_issues(self.issues)
    
    def ML_data(self, ML_type: str) -> List[Dict[str, Any]]:

        """
        This method retrieves machine learning data for a given issue type ('Anomaly' or 'Failure').

        Arguments
        - ML_type (str): A string indicating the issue type to retrieve machine learning data for ('Anomaly' or 'Failure').

        Return
        A list of dictionaries representing the machine learning data for the specified issue type. Each dictionary contains the following keys:
                - 'IssueId' (int): The ID of the issue.
                - 'AlertingDate' (str): The date on which the issue was first detected (taken from the 'date' key in the 'issues' dictionary).
                - 'AlertId' (int): The ID of the alert associated with the issue.
                - 'AgentId' (int): The ID of the agent associated with the alert.
                - 'ML_type' (str): The type of machine learning algorithm used to generate the alert.
                - 'Tags'(list[dict] ): A list of dictionaries representing the tag rankings for the alert associated with the issue. Each dictionary contains the following keys:
                        - 'tagId' (int): The ID of the tag.
                        - 'SensorName' (str): The name of the sensor associated with the tag.
                        - 'Contribution' (float): The contribution of the tag to the alert score.
        Examples:
        >>> data = APM_APIs.ML_data('Anomaly')
        >>> print(data[0])
            [
            {'IssueId': '4144a07b-0e12-43c1-b845-b4a79e8d74cc',
            'IssueDate': '2023-02-27T22:15:00.000Z',
            'AlertId': 20,
            'AgentId': 11,
            'ML_type': 'EXTERNAL_ML_AGENT',
            'Tags': [{'tagId': 319,
            'SensorName': 'A1113A',
            'Contribution': 0.3209527723026447},
            {'tagId': 321, 'SensorName': 'A1113D', 'Contribution': 0.15552047713223402},
            {'tagId': 324, 'SensorName': 'A1113G', 'Contribution': 0.13122255366051214},
            {'tagId': 257, 'SensorName': 'FC1021', 'Contribution': 0.11538950622779073},
            {'tagId': 322, 'SensorName': 'A1113E', 'Contribution': 0.09835039154621021},
            {'tagId': 237, 'SensorName': 'A1113B', 'Contribution': 0.09352484830269507},
            {'tagId': 256, 'SensorName': 'FC1038', 'Contribution': 0.08503945082791306}]}
            ]
        """

        ML_issues = self.filtered_issues[ML_type]

        ML_data = [
                    {"IssueId": issue["issueId"], 
                     "IssueDate": issue["date"],
                     "AlertId": None, 
                     "AgentId": None, 
                     "ML_type": None, 
                     "Tags": []} 
                     for issue in ML_issues]

        for alert in self.alerts:
            for issue_dict in ML_data:
                if issue_dict["IssueId"] == alert["fkApmvIssue"]:
                    issue_dict["AlertId"] = alert["alertId"]
                    issue_dict["AgentId"] = alert["apmvLiveAgentId"]
                    issue_dict["ML_type"] = alert["mlAgentTypeString"]
                    issue_dict["Tags"] = [
                                            {"tagId": tag["fkTagReferenceId"], 
                                             "SensorName": tag["sensorName"], 
                                             "Contribution": tag["percent"]} for tag in self.tag_rankings if tag["fkAlertId"] == alert["alertId"]]
                    issue_dict["Tags"].sort(key = lambda x: x["Contribution"], reverse = True)

        return ML_data
            
   
    def filter_ML_data(self, ml_data: List, ML_type: str) -> List[Dict[str, Any]]:

        """
        Filters a list of machine learning issue data to only include the specified type.

        Args:
            ml_data (List): A list of dictionaries containing machine learning issue data.
            ML_type (str): The type of machine learning data to filter for. Valid options are "Normal", 
                "Maestro", and "EXTERNAL_ML_AGENT".

        Returns:
            List: A list of dictionaries containing only the specified type of machine learning data.
        """

        if ML_type == "Normal":
            Ml_filtered_data = [item for item in ml_data if item["ML_type"] not in ["Maestro", "EXTERNAL_ML_AGENT"]]

        elif ML_type in ["Maestro", "EXTERNAL_ML_AGENT"]:
            Ml_filtered_data = [item for item in ml_data if item["ML_type"] == ML_type]

        else: 
            Ml_filtered_data = []

        return Ml_filtered_data
    

    def all_filtered_ML_data(self, ml_data: List) -> dict:

        """
        Filters a list of machine learning issue data to include only Normal, Maestro, and EXTERNAL_ML_AGENT data.

        Args:
            ml_data (List): A list of dictionaries containing machine learning issue data.

        Returns:
            dict: A dictionary containing three keys, "Normal", "Maestro", and "External", with each corresponding to
            a list of dictionaries containing the respective type of machine learning type.
        """

        ML = {"Normal": [],
              "Maestro": [],
              "External": []}
        
        ML["Normal"] = self.filter_ML_data(ml_data, "Normal")
        ML["Maestro"] = self.filter_ML_data(ml_data, "Maestro")
        ML["External"] = self.filter_ML_data(ml_data, "EXTERNAL_ML_AGENT")

        return ML
    
    

        
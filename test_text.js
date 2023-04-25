let issues = [
  {
    "IssueId": "6578c107-800d-4a8b-b8a5-1b09c2332f5f",
    "AlertId": 16,
    "AgentId": 4,
    "ML_type": "EXTERNAL_ML_AGENT",
    "Tags": [
      {
        "tagId": 322,
        "SensorName": "A1113E",
        "Contribution": 0.0
      },
      {
        "tagId": 319,
        "SensorName": "A1113A",
        "Contribution": 0.0
      },
      {
        "tagId": 255,
        "SensorName": "FC1106",
        "Contribution": 0.0
      },
      {
        "tagId": 256,
        "SensorName": "FC1038",
        "Contribution": 0.0
      },
      {
        "tagId": 237,
        "SensorName": "A1113B",
        "Contribution": 0.0
      },
      {
        "tagId": 320,
        "SensorName": "A1113C",
        "Contribution": 0.0
      }
    ]
  },
  {
    "IssueId": "2ae80ec6-ab6f-445d-91fe-5b997f44df71",
    "AlertId": 13,
    "AgentId": 10,
    "ML_type": "EXTERNAL_ML_AGENT",
    "Tags": [
      {
        "tagId": 322,
        "SensorName": "A1113E",
        "Contribution": 0.0
      },
      {
        "tagId": 320,
        "SensorName": "A1113C",
        "Contribution": 0.0
      },
      {
        "tagId": 321,
        "SensorName": "A1113D",
        "Contribution": 0.0
      },
      {
        "tagId": 237,
        "SensorName": "A1113B",
        "Contribution": 0.0
      },
      {
        "tagId": 323,
        "SensorName": "A1113F",
        "Contribution": 0.0
      },
      {
        "tagId": 319,
        "SensorName": "A1113A",
        "Contribution": 0.0
      },
      {
        "tagId": 324,
        "SensorName": "A1113G",
        "Contribution": 0.0
      }
    ]
  },
  {
    "IssueId": "d9c9f8b9-872c-4947-9992-91ba197c3a5f",
    "AlertId": 17,
    "AgentId": 13,
    "ML_type": "EXTERNAL_ML_AGENT",
    "Tags": [
      {
        "tagId": 323,
        "SensorName": "A1113F",
        "Contribution": 0.0
      },
      {
        "tagId": 256,
        "SensorName": "FC1038",
        "Contribution": 0.0
      },
      {
        "tagId": 237,
        "SensorName": "A1113B",
        "Contribution": 0.0
      },
      {
        "tagId": 320,
        "SensorName": "A1113C",
        "Contribution": 0.0
      },
      {
        "tagId": 255,
        "SensorName": "FC1106",
        "Contribution": 0.0
      },
      {
        "tagId": 319,
        "SensorName": "A1113A",
        "Contribution": 0.0
      }
    ]
  },
  {
    "IssueId": "4144a07b-0e12-43c1-b845-b4a79e8d74cc",
    "AlertId": 20,
    "AgentId": 11,
    "ML_type": "EXTERNAL_ML_AGENT",
    "Tags": [
      {
        "tagId": 319,
        "SensorName": "A1113A",
        "Contribution": 0.3209527723026447
      },
      {
        "tagId": 321,
        "SensorName": "A1113D",
        "Contribution": 0.15552047713223402
      },
      {
        "tagId": 324,
        "SensorName": "A1113G",
        "Contribution": 0.13122255366051214
      },
      {
        "tagId": 257,
        "SensorName": "FC1021",
        "Contribution": 0.11538950622779073
      },
      {
        "tagId": 322,
        "SensorName": "A1113E",
        "Contribution": 0.09835039154621021
      },
      {
        "tagId": 237,
        "SensorName": "A1113B",
        "Contribution": 0.09352484830269507
      },
      {
        "tagId": 256,
        "SensorName": "FC1038",
        "Contribution": 0.08503945082791306
      }
    ]
  },
  {
    "IssueId": "b3667fca-e82b-4af3-9b3b-4e6ea3854e20",
    "AlertId": 18,
    "AgentId": 17,
    "ML_type": "EXTERNAL_ML_AGENT",
    "Tags": [
      {
        "tagId": 314,
        "SensorName": "MonthOfYear50PercentNoise",
        "Contribution": 0.0
      },
      {
        "tagId": 315,
        "SensorName": "MinuteOfDay",
        "Contribution": 0.0
      },
      {
        "tagId": 316,
        "SensorName": "HourOfDay10PercentNoise",
        "Contribution": 0.0
      }
    ]
  }
]
function RandomIssue(IssueList){
  let randomIndex = Math.floor(Math.random() * IssueList.length);
  return IssueList[randomIndex];
}
let issue = RandomIssue(issues);
let IssueId = issue.IssueId;
let AgentId = issue.AgentId;
let Tags = [];
for (let i = 0; i < Math.min(issue.Tags.length, 5); i++) {
  Tags.push(issue.Tags[i].tagId);
}
 console.log(Tags);
import { sleep, group, check } from 'k6'
import http from 'k6/http'

// NTLM authentication
let Domain = 'QE-APM-GEN-01.qae.aspentech.com'
let username = 'user1';
let password = 'PwdUsr1#FY23Q4';
username = encodeURIComponent(username);
password = encodeURIComponent(password);
const credentials =`${username}:${password}`;

//Issue Data
let issues = [
  {
    "IssueId": "1bdc0c52-9b50-49e6-a4b9-4cd9737caabc",
    "IssueDate": "2023-02-21T06:00:00.000Z",
    "AlertId": 10,
    "AgentId": 32,
    "ML_type": "BACK_PROPAGATION",
    "Tags": [
      {
        "tagId": 313,
        "SensorName": "Year10PercentNoise",
        "Contribution": 1.0
      },
      {
        "tagId": 283,
        "SensorName": "SecondOfDay05PercentNoise",
        "Contribution": 0.0
      },
      {
        "tagId": 272,
        "SensorName": "Drive_C_DiskAvailableSpace",
        "Contribution": 0.0
      }
    ]
  },
  {
    "IssueId": "ab63864a-ead2-4aad-8755-068ca13f87db",
    "IssueDate": "2023-02-22T06:05:00.000Z",
    "AlertId": 14,
    "AgentId": 22,
    "ML_type": "BACK_PROPAGATION",
    "Tags": [
      {
        "tagId": 257,
        "SensorName": "FC1021",
        "Contribution": 0.5194664233049333
      },
      {
        "tagId": 324,
        "SensorName": "A1113G",
        "Contribution": 0.48053357669506663
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
let IssueDate = issue.IssueDate;
let Tags = [];
for (let i = 0; i < Math.min(issue.Tags.length, 5); i++) {
  Tags.push(issue.Tags[i].tagId);
}

// Function to obtain the dates for timeline and sensors
function generateDates(AlertingDate) {
const dateNow = new Date();
const dateAlert = new Date(AlertingDate);
const timeDiff = dateNow.getTime() - dateAlert.getTime();
const weekDiff = timeDiff / (1000 * 60 * 60 * 24 * 7);

let StartTrend, EndTrend, StartTimeLine, EndTimeLine;

if (weekDiff >= 5) {
    StartTrend = new Date(dateAlert.getTime() - (4 * 7 * 24 * 60 * 60 * 1000)).toISOString();
    EndTrend = new Date(dateAlert.getTime() + (1 * 7 * 24 * 60 * 60 * 1000)).toISOString();
    StartTimeLine = new Date(dateAlert.getTime() - (9 * 7 * 24 * 60 * 60 * 1000)).toISOString();
    EndTimeLine = new Date(dateAlert.getTime() + (6 * 7 * 24 * 60 * 60 * 1000)).toISOString();
} else if (weekDiff > 1) {
    StartTrend = new Date(dateAlert.getTime() - (4 * 7 * 24 * 60 * 60 * 1000)).toISOString();
    EndTrend = new Date(dateAlert.getTime() + (1 * 7 * 24 * 60 * 60 * 1000)).toISOString();
    StartTimeLine = new Date(dateNow.getTime() - (15 * 7 * 24 * 60 * 60 * 1000)).toISOString();
    EndTimeLine = dateNow.toISOString();
} else {
    StartTrend = new Date(dateAlert.getTime() - (4 * 7 * 24 * 60 * 60 * 1000)).toISOString();
    EndTrend = dateNow.toISOString();
    StartTimeLine = new Date(dateNow.getTime() - (15 * 7 * 24 * 60 * 60 * 1000)).toISOString();
    EndTimeLine = dateNow.toISOString();
}

return {
    StartTrend: StartTrend,
    EndTrend: EndTrend,
    StartTimeLine: StartTimeLine,
    EndTimeLine: EndTimeLine,
};
}
const { StartTrend, EndTrend, StartTimeLine, EndTimeLine } = generateDates(IssueDate);

export const options = {}

export default function main() {
  let response

  group(`${Domain}/MAM/`, function () {

		let checkOutput = (HTTPresponse, code) => {
		  let checks = {};
		  if (HTTPresponse.status === code) {
		    checks[`URL: ${HTTPresponse.url}`] = HTTPresponse.status === code;
		  } else {
			checks[`URL: ${HTTPresponse.url} | Expected code: ${code} - Actual code: ${HTTPresponse.status}`] = false;
		  }
		  check(HTTPresponse, checks);
		}

    response = http.get(`https://${credentials}@${Domain}/MAM/`,
      { auth: 'ntlm', headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        Connection: 'keep-alive',
        Cookie:
          'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
        Host: `${Domain}`,
        'If-Modified-Since': 'Fri, 13 Jan 2023 19:51:34 GMT',
        'If-None-Match': '"0a776708827d91:0"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
        'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    });
		checkOutput(response, 304);

    response = http.get(`https://${credentials}@${Domain}/MAM/runtime.dfa0d9869a24f69f.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/polyfills.82dbc6e186e9ade4.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/scripts.18d7f25c6913fe4a.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/vendor.f6a2ec09f96e28ef.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/main.37a298e736a29fce.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/styles.7f8debf0e51c8ecb.css`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/Roboto-Regular.ae3a8db9374784f0.ttf`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/config.json`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/api/public/v1/users/current`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/924.eeb5a9a9d23bbf28.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/511.b7af7f74a50ea2f7.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/678.c9e0e780fc438a70.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/704.8c5096d9f42fdc05.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/favicon.ico`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/api/public/v1/user/mtell/defaultuser/preferences`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 404);

    response = http.get(`https://${credentials}@${Domain}/MAM/config.json`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/System/GetVersion`,
      { auth: 'ntlm', headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        Connection: 'keep-alive',
        Cookie:
          'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
        Host: `${Domain}`,
        Referer: `https://${credentials}@${Domain}/MAM/`,
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
        'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    });
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/api/public/v1/sites/sites`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);

    response = http.post(`https://${credentials}@${Domain}/DataProvider/api/public/v1/issues/matrix`,`{"siteId":2,"issueTypes":[2]}`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Origin: `https://${credentials}@${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/assets/icons/failure.svg`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/assets/icons/anomaly.svg`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/assets/icons/diamond.svg`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/material-icons-font.fddf374f87939b46.woff2`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/material-icons-outline-font.c906ba755b27ba26.woff2`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/assets/icons/diamond.svg`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/assets/icons/empty.svg`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/assets/img/custom-company-logo.png`,
        { auth: 'ntlm', headers: {
          Accept: 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 404);

    response = http.post(`https://${credentials}@${Domain}/DataProvider/api/public/v1/issues`,`{"queryStartIndex":0,"queryEndIndex":5,"siteId":2,"criticalityAndSeverity":[],"sortBy":"Priority","issueType":[2]}`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Origin: `https://${credentials}@${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/assets/img/company-logo.png`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/537.b2589288db455508.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/971.d1cb8c34c7c062ad.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/MAM/228.0d5f6e77cdff2ce4.js`, { auth: 'ntlm' });;
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/api/public/v1.0/issue/${IssueId}/hierarchy`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/api/public/v1/issue/${IssueId}`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/api/public/v1/users/issue/${IssueId}/users`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/api/public/v1/issue/${IssueId}/timeline?startTime=${StartTimeLine}&endTime=${EndTimeLine}`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 0);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/api/public/v1/issue/${IssueId}/timeline?startTime=${StartTimeLine}&endTime=${EndTimeLine}`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 0);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/api/public/v1/issue/${IssueId}/agents`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/api/public/v1/issue/${IssueId}/sensors`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);

    response = http.get(`https://${credentials}@${Domain}/DataProvider/api/public/v1/issue/${IssueId}/timeline?startTime=${StartTimeLine}&endTime=${EndTimeLine}`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);

    response = http.post(`https://${credentials}@${Domain}/DataProvider/api/public/v1/agent/trend`,`{"apmvAgentIds":[${AgentId}],"startTime":"${StartTrend}","endTime":"${EndTrend}"}`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Origin: `https://${credentials}@${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);

    response = http.post(`https://${credentials}@${Domain}/DataProvider/api/public/v1/issue/${IssueId}/sensor/trend`,`{"sensor":{"apmvAgentId":${AgentId},"sensorIds":[${Tags}]},"startTime":"${StartTrend}","endTime":"${EndTrend}"}`,
        { auth: 'ntlm', headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: `${Domain}`,
          Origin: `https://${credentials}@${Domain}`,
          Referer: `https://${credentials}@${Domain}/MAM/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
          'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    );
		checkOutput(response, 200);
  })

  // Automatically added sleep
  //sleep(1)
}

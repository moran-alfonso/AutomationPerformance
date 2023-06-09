// Creator: WebInspector 537.36

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {}

export default function main() {
  let response

  group('page_7 - https://qe-apm-gen-01.qae.aspentech.com/MAM/', function () {
    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/', {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        Connection: 'keep-alive',
        Cookie:
          'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
        Host: 'qe-apm-gen-01.qae.aspentech.com',
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
    })

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/runtime.dfa0d9869a24f69f.js')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/polyfills.82dbc6e186e9ade4.js')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/scripts.18d7f25c6913fe4a.js')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/vendor.f6a2ec09f96e28ef.js')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/main.37a298e736a29fce.js')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/styles.7f8debf0e51c8ecb.css')

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/MAM/Roboto-Regular.ae3a8db9374784f0.ttf'
    )

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/config.json')

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/users/current',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/924.eeb5a9a9d23bbf28.js')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/511.b7af7f74a50ea2f7.js')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/678.c9e0e780fc438a70.js')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/704.8c5096d9f42fdc05.js')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/favicon.ico')

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/user/mtell/defaultuser/preferences',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/config.json')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/DataProvider/System/GetVersion', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        Connection: 'keep-alive',
        Cookie:
          'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
        Host: 'qe-apm-gen-01.qae.aspentech.com',
        Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
        'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/sites/sites',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.post(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/issues/matrix',
      '{"siteId":2,"issueTypes":[2]}',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Origin: 'https://qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/assets/icons/failure.svg')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/assets/icons/anomaly.svg')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/assets/icons/diamond.svg')

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/MAM/material-icons-font.fddf374f87939b46.woff2'
    )

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/MAM/material-icons-outline-font.c906ba755b27ba26.woff2'
    )

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/assets/icons/diamond.svg')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/assets/icons/empty.svg')

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/MAM/assets/img/custom-company-logo.png',
      {
        headers: {
          Accept: 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.post(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/issues',
      '{"queryStartIndex":0,"queryEndIndex":5,"siteId":2,"criticalityAndSeverity":[],"sortBy":"Priority","issueType":[2]}',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Origin: 'https://qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/assets/img/company-logo.png')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/537.b2589288db455508.js')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/971.d1cb8c34c7c062ad.js')

    response = http.get('https://qe-apm-gen-01.qae.aspentech.com/MAM/228.0d5f6e77cdff2ce4.js')

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1.0/issue/179ac00d-c2b6-4a03-9819-2e3f4032a791/hierarchy',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/issue/179ac00d-c2b6-4a03-9819-2e3f4032a791',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/users/issue/179ac00d-c2b6-4a03-9819-2e3f4032a791/users',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/issue/179ac00d-c2b6-4a03-9819-2e3f4032a791/timeline?startTime=2022-12-14T21:16:05.173Z&endTime=2023-03-29T21:16:05.173Z',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/issue/179ac00d-c2b6-4a03-9819-2e3f4032a791/timeline?startTime=2022-12-14T21:16:05.173Z&endTime=2023-03-29T21:16:05.173Z',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/issue/179ac00d-c2b6-4a03-9819-2e3f4032a791/agents',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/issue/179ac00d-c2b6-4a03-9819-2e3f4032a791/sensors',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.get(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/issue/179ac00d-c2b6-4a03-9819-2e3f4032a791/timeline?startTime=2022-12-14T21:16:05.283Z&endTime=2023-03-29T21:16:05.283Z',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.post(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/agent/trend',
      '{"apmvAgentIds":[33],"startTime":"2023-01-25T17:00:00.000Z","endTime":"2023-03-01T17:00:00.000Z"}',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Origin: 'https://qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )

    response = http.post(
      'https://qe-apm-gen-01.qae.aspentech.com/DataProvider/api/public/v1/issue/179ac00d-c2b6-4a03-9819-2e3f4032a791/sensor/trend',
      '{"sensor":{"apmvAgentId":33,"sensorIds":[259,265]},"startTime":"2023-01-25T17:00:00.000Z","endTime":"2023-03-01T17:00:00.000Z"}',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
          Cookie:
            'mp_412f41b9a2f5b1a17e172e08ee7b3691_mixpanel=%7B%22distinct_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22%24device_id%22%3A%20%221827dc46ed08fe-05f41c116807a8-45647f50-e1000-1827dc46ed111d6%22%2C%22Platform%22%3A%20%22Web-Attendee%22%2C%22AccountID%22%3A%20147330%2C%22AccountName%22%3A%20%22%22%2C%22Event%22%3A%20378782%2C%22EventID%22%3A%20%22Tech%20Summit%202022%22%2C%22EventStatus%22%3A%20%22published%22%2C%22BizzaboID%22%3A%20%22NonUser%22%2C%22isBizzaboer%22%3A%20false%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fstatics.teams.cdn.office.net%2F%22%2C%22%24initial_referring_domain%22%3A%20%22statics.teams.cdn.office.net%22%7D; _sp_id.c355=e3a41a17-65d1-4c4c-86d9-67bb9d1133f0.1659967401.2.1660767447.1659967401.c2bc764c-0a11-4ad0-b915-c360699ad97b; _gcl_au=1.1.702501331.1675884261; _ga_2D7Z03JZE8=GS1.1.1676309384.28.1.1676309835.0.0.0; _ga=GA1.2.1839726614.1646232586; _ga_28NELPY8BG=GS1.1.1678384000.20.0.1678384000.0.0.0',
          Host: 'qe-apm-gen-01.qae.aspentech.com',
          Origin: 'https://qe-apm-gen-01.qae.aspentech.com',
          Referer: 'https://qe-apm-gen-01.qae.aspentech.com/MAM/',
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
    )
  })

  // Automatically added sleep
  sleep(1)
}

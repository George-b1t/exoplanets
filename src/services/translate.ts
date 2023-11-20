import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const key = 'AZURE_KEY'
const endpoint = 'https://api.cognitive.microsofttranslator.com'

export async function translate({ texts }: { texts: string[] }) {
  let result: string[] = []

  await axios({
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Ocp-Apim-Subscription-Region': 'eastus',
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString(),
    },
    params: {
      'api-version': '3.0',
      from: 'en',
      to: ['pt'],
    },
    data: texts.map((text: string) => ({
      text,
    })),
    responseType: 'json',
  }).then(function (response) {
    result = response.data.map(
      (item: { translations: { text: string }[] }) => item.translations[0].text,
    )
  })

  return result
}

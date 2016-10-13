const API_BASE_URL = 'https://api.wunderground.com/api'
const API_KEY = 'ba0cc07a93e36edd'
const API_LANG = 'SP'

export function getForCity(city) {
  const url = `${API_BASE_URL}/${API_KEY}/forecast/lang:${API_LANG}/q/${city}.json`

  return fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const temp = result.forecast.txt_forecast.forecastday[0].fcttext_metric

      return {
        clima: temp
      }
    })
}

const API_BASE_URL = 'https://api.wunderground.com/api'
const API_KEY = '***TU***API***KEY***'
const API_LANG = 'SP'

export function getForCity(city) {
  const url = `${API_BASE_URL}/${API_KEY}/conditions/lang:${API_LANG}/q/${city}.json`

  return fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const temp = result.current_observation.feelslike_c
      const clima = result.current_observation.weather

      return {
        temperatura: temp,
        condicion: clima
      }
    })
}

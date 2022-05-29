import { OPEN_WEATHER_API_KEY } from "./config"
const OPEN_WEATHER_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${OPEN_WEATHER_API_KEY}&units=metric`

function formatWeatherData(data) {
  if (data.cod == "404") throw data.message

  return {
    region: data.name,
    temperature: Math.round(data.main.temp),
    imageUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
    skytext: data.weather[0].description,
    date: new Date(data.dt * 1000).toLocaleDateString("default", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    }),
    countryCode: data.sys.country,
  }
}

export async function getWeatherByCoords(lat, lon) {
  const data = await fetch(`${OPEN_WEATHER_BASE_URL}&lat=${lat}&lon=${lon}`)
    .then((res) => res.json())
    .then(formatWeatherData)
  return data
}
export async function getWeatherByLocation(regionName) {
  const data = await fetch(`${OPEN_WEATHER_BASE_URL}&q=${regionName}`)
    .then((res) => res.json())
    .then(formatWeatherData)

  return data
}

/* Unused */
function debounce(cb, delay = 250) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}

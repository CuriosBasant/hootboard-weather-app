export const OPEN_WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_APP_ID

if (!OPEN_WEATHER_API_KEY) throw new Error("API key is required, to use this application")

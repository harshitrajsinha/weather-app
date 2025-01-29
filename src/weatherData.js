async function fetchWeatherData(location) {
  const WEATHER_API =
    "https://my-server-raj-sinha.vercel.app/api/weather/v1/forecast";

  const query = `
      query TodayWeather {
        todayWeather(city: "${String(location)}") {
          location {
            name
            region
            country
            lat
            lon
            tz_id
            localtime
          }
          astronomy {
            sunrise
            sunset
          }
          forecastToday {
            maxtemp_c
            maxtemp_f
            mintemp_c
            mintemp_f
          }
          forecastHourly {
            time_epoch
            time
            temp_c
            temp_f
            wind_mph
            wind_kph
            wind_dir
            humidity
            vis_km
            uv
            is_day
            condition{
              text
            }
          }
          airQuality {
            co
            no2
            o3
            so2
            pm2_5
            pm10
          }
        }
      }
    `;
  try {
    const response = await fetch(WEATHER_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    if (response.headers.get("Content-Type").includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Response cannot be parsed as JSON");
    }
  } catch (error) {
    console.log("Error has occured", error);
    return;
  }
}

export default fetchWeatherData;

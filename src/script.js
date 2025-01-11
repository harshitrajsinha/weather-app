import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
countries.registerLocale(en);

// "https://my-server-raj-sinha.vercel.app/api/weather/v1/forecast",
document.addEventListener("DOMContentLoaded", function () {
  console.log("script loaded");

  async function fetchWeatherData(location) {
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
      const response = await fetch(
        "http://localhost:4000/api/weather/v1/forecast",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      if (response.headers.get("Content-Type").includes("application/json")) {
        const data = response.json();
        return data;
      } else {
        throw new Error("Response cannot be parsed as JSON");
      }
    } catch (error) {
      console.log("Error has occured", error);
      return;
    }
  }

  function createLocationList(locationList) {
    const placeListCont = document.getElementById("place-list");
    placeListCont.replaceChildren();
    const ulElem = document.createElement("ul");
    ulElem.id = "place-container";
    locationList.forEach((place) => {
      const liElem = document.createElement("li");
      liElem.classList.add("place");
      liElem.innerText = place.name;
      const spanElem = document.createElement("span");
      spanElem.classList.add("country");
      const countryCode = countries.getAlpha2Code(
        place.country.toLowerCase(),
        "en"
      );
      spanElem.innerHTML = ` ${countryCode}`;
      liElem.appendChild(spanElem);
      ulElem.appendChild(liElem);
    });
    placeListCont.appendChild(ulElem);
  }

  function getTimeData(timezone) {
    let tzObj = new Date();
    const tzDate = tzObj.toLocaleString("en-US", {
      timeZone: timezone,
    });
    const date = new Date(tzDate);

    const shortMonth = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);
    const weekday = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);
    const day = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
    }).format(date);
    const hour = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
    }).format(date);

    return [shortMonth, weekday, day, hour];
  }

  // function to display location, date and time
  function displayLocationTime(locationObj) {
    const city = locationObj.name;
    const country = locationObj.country.toLowerCase();
    const timezone = locationObj.tz_id;
    document.getElementById("loc-city").textContent = city;
    const countryCode = countries.getAlpha2Code(country, "en");
    document.getElementById("loc-country").textContent = countryCode;
    const [shortMonth, weekday, day] = getTimeData(timezone);
    document.getElementById(
      "date"
    ).innerHTML = `${weekday}, ${shortMonth} ${day}`;
  }

  // function to create component
  function createCurrHrComp(currWeather) {
    const divContainer = document.createElement("div");
    divContainer.classList.add("hour-weather");
    const divObj = {
      tempVal: {
        class: "hour-temp-val",
        innerHTML: `${Math.round(currWeather.temp_c)}&#176;c`,
      },
      tempIcon: {
        class: "hour-temp-icon",
        innerHTML: `<i class="fa-solid fa-cloud"></i>`,
      },
      windSpeed: {
        class: "hour-wind-speed",
        innerHTML: `${currWeather.wind_kph}km/h`,
      },
      time: {
        class: "hour-time",
        innerHTML: `${currWeather["time"].split(" ")[1]}`,
      },
    };
    Object.values(divObj).forEach((obj) => {
      const divElem = document.createElement("div");
      divElem.classList.add(`${obj.class}`);
      divElem.innerHTML = `${obj.innerHTML}`;
      divContainer.appendChild(divElem);
    });

    return divContainer;
  }

  // function to dispaly 24-hour forecast
  function displayHourlyData(hourlyWeather, hour) {
    const fragment = document.createDocumentFragment();
    const currWeatherObj = hourlyWeather[parseInt(hour)];
    console.log(currWeatherObj);
    document.getElementById("temp-val").textContent = Math.round(
      currWeatherObj["temp_c"]
    );
    document.getElementById(
      "humidity-val"
    ).textContent = `${currWeatherObj["humidity"]}%`;
    document.getElementById(
      "visibility-val"
    ).textContent = `${currWeatherObj["vis_km"]} km`;
    hourlyWeather.forEach((currHrWeather) => {
      fragment.appendChild(createCurrHrComp(currHrWeather));
    });

    return fragment;
  }

  async function getLocations(query) {
    const SEARCH_URL = "http://localhost:4000/api/weather/v1/search";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: query,
      }),
    };
    try {
      const response = await fetch(SEARCH_URL, options);
      if (!response.ok) {
        throw new Error(`Failed to fetch sentence: ${response.statusText}`);
      }
      if (
        response.headers.get("Content-Type") &&
        response.headers.get("Content-Type").includes("application/json")
      ) {
        const data = await response.json();
        return data.data;
      } else {
        throw new Error("Response is not JSON:", contentType);
      }
    } catch (error) {
      console.log("Error has occured", error);
    }
  }

  async function handleUserInput() {
    const query = document.querySelector("#search-city input").value;
    if (!query) {
      document.getElementById("place-list").style.display = "none";
    }
    if (!(query.length > 3)) {
      console.log("Type more than 3 characters");
      return;
    }
    const locationList = await getLocations(query);
    if (locationList && locationList.length) {
      document.getElementById("place-list").style.display = "block";
      createLocationList(locationList);
    }
  }

  document.querySelector("#place-list").addEventListener("click", function (e) {
    document
      .querySelector("#search-city input")
      .removeEventListener("input", handleUserInput);
    const query = e.target.firstChild.data;
    document.querySelector("#place-list").style.display = "none";
    main(query);
  });

  document.addEventListener("click", (e) => {
    let placeConDisplay = document.getElementById("place-list").style.display;
    if (!e.target.classList.contains("place") && placeConDisplay === "block") {
      document.getElementById("place-list").style.display = "none";
    }
  });

  document.querySelector("#search-city input").addEventListener("focus", () => {
    document
      .querySelector("#search-city input")
      .addEventListener("input", handleUserInput);
  });

  async function main(query) {
    const weatherData = await fetchWeatherData(query);
    if (weatherData) {
      // store hourly data to localStorage
      const hourlyData = weatherData.data.todayWeather.forecastHourly;
      const timezone = weatherData.data.todayWeather.location.tz_id;
      if (hourlyData) {
        const weatherdata = {
          timezone: timezone,
          hourlyData: hourlyData,
        };
        if (localStorage.getItem("hourly-data") !== null) {
          localStorage.removeItem("hourly-data");
        }
        // now time ka data also store to fetch next hour
        localStorage.setItem("hourly-data", JSON.stringify(weatherdata));
      }

      // display location and time
      const locationObj = weatherData.data.todayWeather.location;
      if (locationObj) {
        displayLocationTime(locationObj);
      }
    }
    const localHourlyData = localStorage.getItem("hourly-data");
    if (localHourlyData) {
      const [, , , hour] = getTimeData(JSON.parse(localHourlyData).timezone);
      const hourlyForecast = displayHourlyData(
        JSON.parse(localHourlyData).hourlyData,
        hour
      );
      if (hourlyForecast) {
        const hrForecastContainer = document.getElementById(
          "hour-weather-container"
        );
        hrForecastContainer.appendChild(hourlyForecast);
      }
    } else {
      console.log("Hourly data is not present");
    }
  }
});

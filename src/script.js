document.addEventListener("DOMContentLoaded", function () {
  console.log("script loaded");
  let setLocationClock;

  const weatherType = {
    sunny: {
      text: "sunny",
      "fav-icon": "<i class='fa-solid fa-circle' style='color: #ffd43b'></i>",
      "lottie-url":
        "https://lottie.host/16d8aced-291d-4d79-860d-26804bb14bc9/Ax0qw92s3m.json",
    },
    clear: {
      text: "clear",
      "fav-icon": "<i class='fa-solid fa-cloud-sun'></i>",
      "lottie-url":
        "https://lottie.host/16d8aced-291d-4d79-860d-26804bb14bc9/Ax0qw92s3m.json",
      "is-night-icon":
        "<i class='fa-solid fa-moon' style='color: #ece5c8'></i>",
      "is-night-url":
        "https://lottie.host/82081fd5-e6e4-4502-a820-3a9d4293cc46/psqP1MQVIE.json",
    },
    fog: {
      text: "fog",
      "fav-icon": "<i class='fa-solid fa-smog' style='color: #a5a5a5'></i>",
      "lottie-url":
        "https://lottie.host/a1b2f61c-354d-4129-8d5d-de71813fea09/zaZ4AMrJA1.json",
    },
    "freezing fog": {
      text: "freezing fog",
      "fav-icon": "<i class='fa-solid fa-smog' style='color: #a5a5a5'></i>",
      "lottie-url":
        "https://lottie.host/a1b2f61c-354d-4129-8d5d-de71813fea09/zaZ4AMrJA1.json",
    },
    mist: {
      text: "mist",
      "fav-icon": "<i class='fa-solid fa-smog' style='color: #a5a5a5'></i>",
      "lottie-url":
        "https://lottie.host/0a542872-2e37-47b0-bf2a-70c869cd6648/nrk2NWqoP0.json",
    },
    "partly cloudy": {
      text: "partly cloudy",
      "fav-icon": "<i class='fa-solid fa-cloud-sun'></i>",
      "lottie-url":
        "https://lottie.host/c7cc8bd4-a397-4cb9-80b6-456b700c2ca8/q4fEkMfC6q.json",
    },
    cloudy: {
      text: "cloudy",
      "fav-icon": "<i class='fa-solid fa-cloud'></i>",
      "lottie-url":
        "https://lottie.host/2ba2867e-358a-4154-9426-592be155f333/OD6Twim6Ep.json",
      "is-night-icon": "<i class='fa-solid fa-cloud-moon'></i>",
      "is-night-url":
        "https://lottie.host/13c83532-cbbf-4a44-97da-5e36fb4a02db/8Mh6m20ynC.json",
    },
    overcast: {
      text: "overcast",
      "fav-icon": "<i class='fa-solid fa-cloud-bolt'></i>",
      "lottie-url":
        "https://lottie.host/abd7a5a8-025a-46d8-82d1-7372c5a4581c/6v1OMCsgVZ.json",
    },
    "light rain": {
      text: "light rain",
      "fav-icon": "<i class='fa-solid fa-cloud-sun-rain'></i>",
      "lottie-url":
        "https://lottie.host/17821ca4-8aa8-4d3b-affe-1f73c7fd91e4/j4q7EMlLXT.json",
      "is-night-icon": "<i class='fa-solid fa-cloud-moon'></i>",
      "is-night-url":
        "https://lottie.host/13c83532-cbbf-4a44-97da-5e36fb4a02db/8Mh6m20ynC.json",
    },
    "little drizzle": {
      text: "light rain",
      "fav-icon": "<i class='fa-solid fa-cloud-sun-rain'></i>",
      "lottie-url":
        "https://lottie.host/17821ca4-8aa8-4d3b-affe-1f73c7fd91e4/j4q7EMlLXT.json",
      "is-night-icon": "<i class='fa-solid fa-cloud-moon'></i>",
      "is-night-url":
        "https://lottie.host/13c83532-cbbf-4a44-97da-5e36fb4a02db/8Mh6m20ynC.json",
    },
    "light rain shower": {
      text: "light rain shower",
      "fav-icon": "<i class='fa-solid fa-cloud-sun-rain'></i>",
      "lottie-url":
        "https://lottie.host/17821ca4-8aa8-4d3b-affe-1f73c7fd91e4/j4q7EMlLXT.json",
      "is-night-icon": "<i class='fa-solid fa-cloud-moon'></i>",
      "is-night-url":
        "https://lottie.host/13c83532-cbbf-4a44-97da-5e36fb4a02db/8Mh6m20ynC.json",
    },
    "patchy rain possible": {
      text: "patchy rain possible",
      "fav-icon": "<i class='fa-solid fa-cloud-sun-rain'></i>",
      "lottie-url":
        "https://lottie.host/17821ca4-8aa8-4d3b-affe-1f73c7fd91e4/j4q7EMlLXT.json",
      "is-night-icon": "<i class='fa-solid fa-cloud-moon'></i>",
      "is-night-url":
        "https://lottie.host/13c83532-cbbf-4a44-97da-5e36fb4a02db/8Mh6m20ynC.json",
    },
    "patchy light rain": {
      text: "patchy light rain",
      "fav-icon": "<i class='fa-solid fa-cloud-sun-rain'></i>",
      "lottie-url":
        "https://lottie.host/17821ca4-8aa8-4d3b-affe-1f73c7fd91e4/j4q7EMlLXT.json",
      "is-night-icon": "<i class='fa-solid fa-cloud-moon'></i>",
      "is-night-url":
        "https://lottie.host/13c83532-cbbf-4a44-97da-5e36fb4a02db/8Mh6m20ynC.json",
    },
    "light freezing rain": {
      text: "light freezing rain",
      "fav-icon": "<i class='fa-solid fa-cloud-sun-rain'></i>",
      "lottie-url":
        "https://lottie.host/17821ca4-8aa8-4d3b-affe-1f73c7fd91e4/j4q7EMlLXT.json",
      "is-night-icon": "<i class='fa-solid fa-cloud-moon'></i>",
      "is-night-url":
        "https://lottie.host/13c83532-cbbf-4a44-97da-5e36fb4a02db/8Mh6m20ynC.json",
    },

    "moderate rain": {
      text: "moderate rain",
      "fav-icon": "<i class='fa-solid fa-cloud-rain'></i>",
      "lottie-url":
        "https://lottie.host/7cc08d33-ea03-48d5-b2bc-a97d62393e6b/etdVUPqpni.json",
      "is-night-icon": "<i class='fa-solid fa-cloud-moon-rain'></i>",
      "is-night-url":
        "https://lottie.host/ec5dd451-7a1a-4910-b02f-898c6baafbec/cZwMSU7rID.json",
    },
    "heavy rain": {
      text: "heavy rain",
      "fav-icon": "<i class='fa-solid fa-cloud-showers-heavy'></i>",
      "lottie-url":
        "https://lottie.host/05cd83e4-3871-4a90-8000-d54b71c1faa0/kgsqD16cPl.json",
    },
    "moderate or heavy rain shower": {
      text: "moderate or heavy rain shower",
      "fav-icon": "<i class='fa-solid fa-cloud-showers-heavy'></i>",
      "lottie-url":
        "https://lottie.host/05cd83e4-3871-4a90-8000-d54b71c1faa0/kgsqD16cPl.json",
    },
    "torrential rain shower": {
      text: "torrential rain shower",
      "fav-icon": "<i class='fa-solid fa-cloud-showers-heavy'></i>",
      "lottie-url":
        "https://lottie.host/05cd83e4-3871-4a90-8000-d54b71c1faa0/kgsqD16cPl.json",
    },
    "light snow": {
      text: "light snow",
      "fav-icon":
        "<i class='fa-solid fa-snowflake' style='color: #dedede;''></i>",
      "lottie-url":
        "https://lottie.host/b3aefc23-af3e-4e1f-9537-957f23f252f0/15xT1wrWvr.json",
    },
    "patchy light snow": {
      text: "patchy light snow",
      "fav-icon":
        "<i class='fa-solid fa-snowflake' style='color: #dedede;''></i>",
      "lottie-url":
        "https://lottie.host/b3aefc23-af3e-4e1f-9537-957f23f252f0/15xT1wrWvr.json",
    },
    snow: {
      text: "snow",
      "fav-icon":
        "<i class='fa-solid fa-snowman' style='color: #e6e6e6;''></i>",
      "lottie-url":
        "https://lottie.host/e998cc4e-bc1f-40a7-a0e9-420b36b81bd9/XGuXZQyAAf.json",
      "is-night-icon":
        "<i class='fa-solid fa-snowman' style='color: #e6e6e6;''></i>",
      "is-night-url":
        "https://lottie.host/e998cc4e-bc1f-40a7-a0e9-420b36b81bd9/XGuXZQyAAf.json",
    },
  };

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
      const response = await fetch(
        "https://my-server-raj-sinha.vercel.app/api/weather/v1/forecast",
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

  async function getCountryCode(countryName) {
    try {
      const response = await fetch("./src/countries.json");
      if (!response.ok) {
        throw new Error("status not ok while fetching country data");
      }
      const countriesData = await response.json();
      if (countriesData) {
        const countryFirstLetter = countryName.slice(0, 1).toUpperCase();
        if (!(countryFirstLetter in countriesData.countriesToCode)) {
          console.log("country not present in list");
          return;
        }
        const countryCode =
          countriesData["countriesToCode"][countryFirstLetter][countryName];
        return countryCode;
      }
    } catch (error) {
      console.log("Error occured while fetching country data", error);
    }
  }

  function createLocationList(locationList) {
    const placeListCont = document.getElementById("place-list");
    placeListCont.replaceChildren();
    const ulElem = document.createElement("ul");
    ulElem.id = "place-container";
    locationList.forEach(async (place) => {
      const liElem = document.createElement("li");
      liElem.classList.add("place");
      liElem.innerText = place.name;
      const spanElem = document.createElement("span");
      spanElem.classList.add("country");
      const countryCode = await getCountryCode(place.country);
      if (countryCode) {
        spanElem.innerHTML = ` ${countryCode}`;
      } else {
        spanElem.innerHTML = "";
      }
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
    const minute = new Intl.DateTimeFormat("en-US", {
      minute: "numeric",
    }).format(date);
    const second = new Intl.DateTimeFormat("en-US", {
      second: "numeric",
    }).format(date);

    return [shortMonth, weekday, day, hour, minute, second];
  }

  // function to display location, date and time
  async function displayLocationTime(locationObj) {
    const city = locationObj.name;
    const country = locationObj.country.toLowerCase();
    const timezone = locationObj.tz_id;
    document.getElementById("loc-city").textContent = city;
    const countryCode = await getCountryCode(country);
    document.getElementById("loc-country").textContent = countryCode;
    const [shortMonth, weekday, day] = getTimeData(timezone);
    document.getElementById(
      "date"
    ).innerHTML = `${weekday}, ${shortMonth} ${day}`;
  }

  // function to create component
  function createCurrHrComp(currWeather) {
    let currTempIcon, getIconData;
    const divContainer = document.createElement("div");
    divContainer.classList.add("hour-weather");
    const condition = currWeather.condition.text.toLowerCase();
    if (condition in weatherType) {
      getIconData = weatherType[condition];
    }
    const isDay = currWeather["is_day"];
    if (isDay && getIconData) {
      currTempIcon = getIconData["fav-icon"];
    } else if (!isDay && getIconData) {
      if ("is-night-icon" in getIconData) {
        currTempIcon = getIconData["is-night-icon"];
      } else {
        currTempIcon = getIconData["fav-icon"];
      }
    } else if (isDay && !getIconData) {
      currTempIcon = "<i class='fa-solid fa-cloud-sun'></i>";
    } else if (!isDay && !getIconData) {
      currTempIcon = "<i class='fa-solid fa-moon' style='color: #ece5c8'></i>";
    }
    const divObj = {
      tempVal: {
        class: "hour-temp-val",
        innerHTML: `${Math.round(currWeather.temp_c)}&#176;c`,
      },
      tempIcon: {
        class: "hour-temp-icon",
        innerHTML: currTempIcon,
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
    let getLottieData, currLottieIcon;
    const fragment = document.createDocumentFragment();
    const currWeatherObj = hourlyWeather[parseInt(hour)];
    document.getElementById("temp-val").textContent = Math.round(
      currWeatherObj["temp_c"]
    );
    const condition = currWeatherObj.condition.text.toLowerCase();
    if (condition in weatherType) {
      getLottieData = weatherType[condition];
    }
    const isDay = currWeatherObj["is_day"];
    if (isDay && getLottieData) {
      currLottieIcon = getLottieData["lottie-url"];
    } else if (!isDay && getLottieData) {
      if ("is-night-url" in getLottieData) {
        currLottieIcon = getLottieData["is-night-url"];
      } else {
        currLottieIcon = getLottieData["lottie-url"];
      }
    } else if (isDay && !getLottieData) {
      currLottieIcon =
        "https://lottie.host/16d8aced-291d-4d79-860d-26804bb14bc9/Ax0qw92s3m.json";
    } else if (!isDay && !getLottieData) {
      currLottieIcon =
        "https://lottie.host/82081fd5-e6e4-4502-a820-3a9d4293cc46/psqP1MQVIE.json";
    }
    const lottie = `<lottie-player
          src = ${currLottieIcon}
          background="##ffffff"
          speed="1"
          loop
          autoplay
          direction="1"
          mode="normal"
        ></lottie-player><div id="weather-condition">${condition}</div>`;
    document.querySelector("#current-weather-lottie").innerHTML = lottie;

    document.getElementById(
      "humidity-val"
    ).textContent = `${currWeatherObj["humidity"]}%`;
    document.getElementById(
      "visibility-val"
    ).textContent = `${currWeatherObj["vis_km"]} km`;
    hourlyWeather.forEach((currHrWeather) => {
      const weatherElem = createCurrHrComp(currHrWeather);
      fragment.appendChild(weatherElem);
    });
    return fragment;
  }

  async function getLocations(query) {
    const SEARCH_URL =
      "https://my-server-raj-sinha.vercel.app/api/weather/v1/search";
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
    if (setLocationClock) {
      clearInterval(setLocationClock);
      setLocationClock = null;
    }
    const weatherData = await fetchWeatherData(query);
    if (weatherData) {
      // store hourly data to sessionStorage
      const hourlyData = weatherData.data.todayWeather.forecastHourly;
      const timezone = weatherData.data.todayWeather.location.tz_id;
      if (hourlyData) {
        const weatherdata = {
          timezone: timezone,
          hourlyData: hourlyData,
        };
        if (sessionStorage.getItem("hourly-data") !== null) {
          sessionStorage.removeItem("hourly-data");
        }
        // now time ka data also store to fetch next hour
        sessionStorage.setItem("hourly-data", JSON.stringify(weatherdata));
      }

      // display location and time
      const locationObj = weatherData.data.todayWeather.location;
      if (locationObj) {
        displayLocationTime(locationObj);
      }
    }
    const localHourlyData = sessionStorage.getItem("hourly-data");
    if (localHourlyData) {
      setLocationClock = setInterval(() => {
        const [, , , hour, minute, second] = getTimeData(
          JSON.parse(localHourlyData).timezone
        );
        const time = `${hour < 10 ? "0" + hour : hour}:${
          minute < 10 ? "0" + minute : minute
        }:${second < 10 ? "0" + second : second}`;
        document.getElementById("time").textContent = "";
        document.getElementById("time").textContent = time;
      }, 1000);
      const [, , , hour] = getTimeData(JSON.parse(localHourlyData).timezone);
      const hourlyForecast = displayHourlyData(
        JSON.parse(localHourlyData).hourlyData,
        hour
      );
      if (hourlyForecast) {
        const hrForecastContainer = document.getElementById(
          "hour-weather-container"
        );
        hrForecastContainer.replaceChildren();
        hrForecastContainer.appendChild(hourlyForecast);
      }
    } else {
      console.log("Hourly data is not present");
    }
  }
});

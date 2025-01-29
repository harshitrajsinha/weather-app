import fetchWeatherData from "./weatherData.js";
import cityList from "./cityList.js";
import weatherType from "./weatherType.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("script loaded");
  let setLocationClock;

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

  async function handleUserInput() {
    const query = document.querySelector("#search-city input").value;
    if (!query) {
      document.getElementById("place-list").style.display = "none";
    }
    if (!(query.length > 3)) {
      console.log("Type more than 3 characters");
      return;
    }
    const locationList = await cityList(query);
    if (locationList && locationList.length) {
      document.getElementById("place-list").style.display = "block";
      createLocationList(locationList);
    }
  }

  document.querySelector("#place-list").addEventListener("click", function (e) {
    let query;
    document
      .querySelector("#search-city input")
      .removeEventListener("input", handleUserInput);
    if (e.target.nodeName === "SPAN") {
      query = e.target.parentElement.firstChild.data;
    } else if (e.target.nodeName === "LI") {
      query = e.target.firstChild.data;
    }
    if (query) {
      document.querySelector("#search-city input").value = query;
      document.querySelector("#place-list").style.display = "none";
      main(query);
    }
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

  // function to fetch country code
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
          console.error("country not present in list");
          console.trace();
          return;
        }
        const countryCode =
          countriesData["countriesToCode"][countryFirstLetter][countryName];
        return countryCode;
      }
    } catch (error) {
      console.error("Error occured while fetching country data", error);
      console.trace();
    }
  }

  // format time based on timezone
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
    const [shortMonth, weekday, day] = getTimeData(timezone);
    const countryCode = await getCountryCode(country);
    document.getElementById("loc-city").textContent = city;
    document.getElementById("loc-country").textContent = countryCode;
    document.getElementById(
      "date"
    ).innerHTML = `${weekday}, ${shortMonth} ${day}`;
  }

  function processHourlyData() {
    const localHourlyData = sessionStorage.getItem("weather-data");
    if (localHourlyData) {
      if (!setLocationClock) {
        setLocationClock = setInterval(() => {
          const [, , , hour, minute, second] = getTimeData(
            JSON.parse(localHourlyData).timezone
          );
          const time = `${hour}:${minute < 10 ? "0" + minute : minute}:${
            second < 10 ? "0" + second : second
          }`;
          document.getElementById("time").textContent = "";
          document.getElementById("time").textContent = time;
        }, 1000);
      }
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
      console.error("Hourly data is not present");
      console.trace();
    }
  }

  // store weather data in local storage
  function storeWeatherData(wdata, location) {
    const hourlyData = wdata.data.todayWeather.forecastHourly;
    const timezone = wdata.data.todayWeather.location.tz_id;
    const weatherdata = {
      timezone: timezone,
      hourlyData: hourlyData,
      location: location,
    };
    if (sessionStorage.getItem("weather-data") !== null) {
      sessionStorage.removeItem("weather-data");
    }
    sessionStorage.setItem("weather-data", JSON.stringify(weatherdata));
  }

  async function main(query) {
    if (setLocationClock) {
      clearInterval(setLocationClock);
      setLocationClock = null;
    }
    const weatherData = await fetchWeatherData(query);
    if (weatherData) {
      storeWeatherData(weatherData, query);

      // display location and time
      const locationObj = weatherData.data.todayWeather.location;
      if (locationObj) {
        displayLocationTime(locationObj);
      }
    } else {
      console.error(`Weather data not fetched for location: ${query}`);
      console.trace();
    }
    processHourlyData();
  }

  main("New Delhi");
});

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
    "is-night-icon": "<i class='fa-solid fa-moon' style='color: #ece5c8'></i>",
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
    "fav-icon": "<i class='fa-solid fa-snowman' style='color: #e6e6e6;''></i>",
    "lottie-url":
      "https://lottie.host/e998cc4e-bc1f-40a7-a0e9-420b36b81bd9/XGuXZQyAAf.json",
    "is-night-icon":
      "<i class='fa-solid fa-snowman' style='color: #e6e6e6;''></i>",
    "is-night-url":
      "https://lottie.host/e998cc4e-bc1f-40a7-a0e9-420b36b81bd9/XGuXZQyAAf.json",
  },
};

export default weatherType;

async function cityList(query) {
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

export default cityList;

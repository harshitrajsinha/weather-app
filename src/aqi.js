function calculateAQI(concentration, breakpoints) {
  for (let [C_low, C_high, I_low, I_high] of breakpoints) {
    if (concentration >= C_low && concentration <= C_high) {
      return (
        ((I_high - I_low) / (C_high - C_low)) * (concentration - C_low) + I_low
      );
    }
  }
  return null; // Out of range
}

const aqiBreakpoints = {
  co: [
    [0, 1, 0, 50],
    [1, 2, 51, 100],
    [2, 10, 101, 200],
    [10, 17, 201, 300],
    [17, 34, 301, 400],
    [34, 50, 401, 500],
  ],
  no2: [
    [0, 40, 0, 50],
    [40, 80, 51, 100],
    [80, 180, 101, 200],
    [180, 280, 201, 300],
    [280, 400, 301, 400],
    [400, 1000, 401, 500],
  ],
  o3: [
    [0, 50, 0, 50],
    [50, 100, 51, 100],
    [100, 168, 101, 200],
    [168, 208, 201, 300],
    [208, 748, 301, 400],
    [748, 1000, 401, 500],
  ],
  pm2_5: [
    [0, 30, 0, 50],
    [30, 60, 51, 100],
    [60, 90, 101, 200],
    [90, 120, 201, 300],
    [120, 250, 301, 400],
    [250, 500, 401, 500],
  ],
  pm10: [
    [0, 50, 0, 50],
    [50, 100, 51, 100],
    [100, 250, 101, 200],
    [250, 350, 201, 300],
    [350, 430, 301, 400],
    [430, 600, 401, 500],
  ],
  so2: [
    [0, 40, 0, 50],
    [40, 80, 51, 100],
    [80, 380, 101, 200],
    [380, 800, 201, 300],
    [800, 1600, 301, 400],
    [1600, 2000, 401, 500],
  ],
};

// const pollutantData = {
//   co: 912.05,
//   no2: 26.64,
//   o3: 197,
//   pm2_5: 134.31,
//   pm10: 163.725,
//   so2: 65.12,
// };

const aqiStandards = {
  co: [
    { range: [0, 1], aqi: [0, 50], status: "Good" },
    { range: [1, 2], aqi: [51, 100], status: "Satisfactory" },
    { range: [2, 10], aqi: [101, 200], status: "Moderate" },
    { range: [10, 17], aqi: [201, 300], status: "Poor" },
    { range: [17, 34], aqi: [301, 400], status: "Very Poor" },
    { range: [34, 50], aqi: [401, 500], status: "Severe" },
  ],
  no2: [
    { range: [0, 40], aqi: [0, 50], status: "Good" },
    { range: [41, 80], aqi: [51, 100], status: "Satisfactory" },
    { range: [81, 180], aqi: [101, 200], status: "Moderate" },
    { range: [181, 280], aqi: [201, 300], status: "Poor" },
    { range: [281, 400], aqi: [301, 400], status: "Very Poor" },
    { range: [401, 1000], aqi: [401, 500], status: "Severe" },
  ],
  o3: [
    { range: [0, 50], aqi: [0, 50], status: "Good" },
    { range: [51, 100], aqi: [51, 100], status: "Satisfactory" },
    { range: [101, 168], aqi: [101, 200], status: "Moderate" },
    { range: [169, 208], aqi: [201, 300], status: "Poor" },
    { range: [209, 748], aqi: [301, 400], status: "Very Poor" },
    { range: [749, 1000], aqi: [401, 500], status: "Severe" },
  ],
  so2: [
    { range: [0, 40], aqi: [0, 50], status: "Good" },
    { range: [41, 80], aqi: [51, 100], status: "Satisfactory" },
    { range: [81, 380], aqi: [101, 200], status: "Moderate" },
    { range: [381, 800], aqi: [201, 300], status: "Poor" },
    { range: [801, 1600], aqi: [301, 400], status: "Very Poor" },
    { range: [1601, 2000], aqi: [401, 500], status: "Severe" },
  ],
  pm2_5: [
    { range: [0, 30], aqi: [0, 50], status: "Good" },
    { range: [31, 60], aqi: [51, 100], status: "Satisfactory" },
    { range: [61, 90], aqi: [101, 200], status: "Moderate" },
    { range: [91, 120], aqi: [201, 300], status: "Poor" },
    { range: [121, 250], aqi: [301, 400], status: "Very Poor" },
    { range: [251, 500], aqi: [401, 500], status: "Severe" },
  ],
  pm10: [
    { range: [0, 50], aqi: [0, 50], status: "Good" },
    { range: [51, 100], aqi: [51, 100], status: "Satisfactory" },
    { range: [101, 250], aqi: [101, 200], status: "Moderate" },
    { range: [251, 350], aqi: [201, 300], status: "Poor" },
    { range: [351, 430], aqi: [301, 400], status: "Very Poor" },
    { range: [431, 600], aqi: [401, 500], status: "Severe" },
  ],
};

export default function getAqiData(pollutantData) {
  const aqiValues = {};
  let maxAQI = 0;

  for (let pollutant in pollutantData) {
    const aqi = calculateAQI(
      pollutantData[pollutant],
      aqiBreakpoints[pollutant]
    );
    if (aqi !== null) {
      aqiValues[pollutant] = aqi;
      maxAQI = Math.max(maxAQI, aqi);
    }
  }

  const maxPollutantVal = Object.entries(aqiValues).find((elem) => {
    return elem[1] === maxAQI;
  });
  maxAQI = Math.round(maxAQI);
  const particulateRange = aqiStandards[maxPollutantVal[0]];
  const aqiRange = particulateRange.find((particulate) => {
    return particulate.aqi[0] <= maxAQI && particulate.aqi[1] >= maxAQI;
  });
  return [aqiValues, maxAQI, aqiRange.status];
}

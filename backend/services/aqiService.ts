const getAirQuality = async () => {
  const response = await fetch(
    `https://api.waqi.info/feed/${"toluca"}/?token=${process.env.AQI_TOKEN}`
  );
  const data = await response.json();
  return data.data.aqi;
};
export default { getAirQuality };

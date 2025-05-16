const list = document.querySelector("select");
let countryCode = 0;
let lat, lng, CountryData;
list.addEventListener("change", () => {
  console.log(list.value);
  console.log(list.selectedIndex);
  console.log(ISOs[list.selectedIndex]);
  // countryCode = list.value;
  countryCode = ISOs[list.selectedIndex];
  GetCountryData(countryCode).then((coords) => {
    console.log(coords);
    getWeather(coords.lat, coords.lng).then((weatherData) => {
      renderCountry(coords, weatherData);
    });
  });
});
const GetCountryData = function (country) {
  return fetch(`https://restcountries.com/v3.1/alpha/${country}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      // console.log(data[0].latlng);
      // console.log(lat, lng);
      CountryData = data[0];
      [lat, lng] = data[0].latlng;
      console.log(lat, lng);
      return { lat, lng, CountryData };
    });
};

const getWeather = function (lat, lng) {
  return (
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=447a2d4f6c742875f373460a6b8756ca&units=metric`
    )
      .then((response) => response.json())
      // .then((data) => {
      //   console.log(data);
      //   data.weather.forEach((i, el) => {
      //     console.log(i, ":", el);
      //   });
      // })
      .catch((error) => {
        console.log(error);
      })
  );
};

// const renderCountry = function (coords, weatherData) {
//   const country = coords.CountryData;
// };

const renderCountry = function (coords, weatherData) {
  const country = coords.CountryData;
  // console.log(coords);
  const container = document.querySelector("#result");

  container.innerHTML = `
    <h2>${country.name.common}</h2>
    <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="120">
    <p>天氣：${weatherData.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="Weather icon">
    <p>氣溫：${weatherData.main.temp}°C</p>
    <p>濕度：${weatherData.main.humidity}%</p>
  `;
};

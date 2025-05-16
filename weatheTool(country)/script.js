const list = document.querySelector("select");

list.addEventListener("change", () => {
  console.log(list.value);
  console.log(list.selectedIndex);
  console.log(ISOs[list.selectedIndex]);
  const countryCode = ISOs[list.selectedIndex];
  getCountryData(countryCode).then((data) => {
    getWeatherData(data.name).then((weatherData) => {
      renderCountry(data, weatherData);
    });
  });
});
const getCountryData = function (country) {
  return fetch(`https://restcountries.com/v3.1/alpha/${country}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data[0]);
      // console.log(data[0].latlng);
      // console.log(lat, lng);
      const CountryData = data[0];
      // [lat, lng] = data[0].latlng;
      // console.log(lat, lng);
      // return { lat, lng, CountryData };
      return CountryData;
    });
};

// const renderCountry = function (data, weatherData) {
//   const country = data;
//   // console.log(data);
//   const container = document.querySelector("#result");

//   container.innerHTML = `
//     <h2>${country.name.common}</h2>
//     <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="120">
//   `;
// };

const renderCountry = function (data, weatherData) {
  const country = data;
  const container = document.querySelector("#result");

  const current = weatherData.current_condition[0];
  const temp = current.temp_C;
  const desc = current.weatherDesc[0].value;
  const icon = current.weatherIconUrl[0].value;

  container.innerHTML = `
    <h2>${country.name.common}</h2>
    <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="120">
    <p>天氣：${desc}</p>
    <p>氣溫：${temp}°C</p>
  `;
};

const getWeatherData = function (country) {
  return fetch(`https://wttr.in/${country}?format=j1`)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};

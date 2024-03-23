const BASE_URL = ' https://api.worldweatheronline.com/premium/v1/weather.ashx?key=e6e140c7b2cd439db2a84140242103&'


export async function fetchCurrentWeather(query) {
  // const apiUrl = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${apiKey}&q=${cityName}&num_of_days=${2}&format=json`;
  const apiUrl = BASE_URL + `q=${query}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);

    return null;
  }
}



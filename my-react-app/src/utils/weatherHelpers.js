// Transform OpenWeatherMap current weather data to your component format
export const transformCurrentWeather = (data) => {
  return {
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    low: Math.round(data.main.temp_min),
    high: Math.round(data.main.temp_max),
    precipitation: data.rain?.['1h'] || data.snow?.['1h'] || 0,
    description: data.weather[0].description,
    icon: mapWeatherIcon(data.weather[0].icon),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    visibility: (data.visibility / 1000).toFixed(1), // Convert to km
    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,
    uvIndex: null, // UV index requires separate API call
    sunrise: new Date(data.sys.sunrise * 1000),
    sunset: new Date(data.sys.sunset * 1000),
    city: data.name,
    country: data.sys.country,
    coordinates: {
      lat: data.coord.lat,
      lon: data.coord.lon,
    },
  };
};

// Transform forecast data
export const transformForecast = (data) => {
  const dailyForecast = {};
  
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    
    if (!dailyForecast[dayKey]) {
      dailyForecast[dayKey] = {
        date: date,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dateStr: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        high: Math.round(item.main.temp_max),
        low: Math.round(item.main.temp_min),
        icon: mapWeatherIcon(item.weather[0].icon),
        precipitation: (item.pop * 100).toFixed(0),
        hourly: [],
      };
    }
    
    dailyForecast[dayKey].hourly.push({
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      hour: date.getHours(),
      temp: Math.round(item.main.temp),
      icon: mapWeatherIcon(item.weather[0].icon),
      description: item.weather[0].description,
      windSpeed: item.wind.speed,
      humidity: item.main.humidity,
    });
    
    // Update high/low for the day
    if (item.main.temp_max > dailyForecast[dayKey].high) {
      dailyForecast[dayKey].high = Math.round(item.main.temp_max);
    }
    if (item.main.temp_min < dailyForecast[dayKey].low) {
      dailyForecast[dayKey].low = Math.round(item.main.temp_min);
    }
  });
  
  return Object.values(dailyForecast).slice(0, 5); // Return 5 days
};

// Transform hourly forecast (next 24 hours)
export const transformHourlyForecast = (data) => {
  return data.list.slice(0, 24).map((item) => {
    const date = new Date(item.dt * 1000);
    return {
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      hour: date.getHours(),
      temp: Math.round(item.main.temp),
      icon: mapWeatherIcon(item.weather[0].icon),
      description: item.weather[0].description,
      precipitation: (item.pop * 100).toFixed(0),
    };
  });
};

// Transform air pollution data
export const transformAirQuality = (data) => {
  const aqi = data.list[0].main.aqi;
  const components = data.list[0].components;
  
  const aqiStatus = {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor',
  };
  
  return {
    aqi: aqi,
    status: aqiStatus[aqi] || 'Unknown',
    pollutants: {
      pm25: { value: components.pm2_5, unit: 'µg/m³', name: 'PM2.5' },
      pm10: { value: components.pm10, unit: 'µg/m³', name: 'PM10' },
      o3: { value: components.o3, unit: 'µg/m³', name: 'O₃' },
      no2: { value: components.no2, unit: 'µg/m³', name: 'NO₂' },
      so2: { value: components.so2, unit: 'µg/m³', name: 'SO₂' },
      co: { value: components.co, unit: 'µg/m³', name: 'CO' },
    },
  };
};

// Map OpenWeatherMap icon codes to Material Symbols
const mapWeatherIcon = (iconCode) => {
  const iconMap = {
    '01d': 'sunny', // clear sky day
    '01n': 'night', // clear sky night
    '02d': 'partly_cloudy_day', // few clouds day
    '02n': 'partly_cloudy_night', // few clouds night
    '03d': 'cloud', // scattered clouds
    '03n': 'cloud',
    '04d': 'cloud', // broken clouds
    '04n': 'cloud',
    '09d': 'rainy', // shower rain
    '09n': 'rainy',
    '10d': 'rainy', // rain day
    '10n': 'rainy', // rain night
    '11d': 'thunderstorm', // thunderstorm
    '11n': 'thunderstorm',
    '13d': 'ac_unit', // snow
    '13n': 'ac_unit',
    '50d': 'foggy', // mist
    '50n': 'foggy',
  };
  
  return iconMap[iconCode] || 'wb_sunny';
};
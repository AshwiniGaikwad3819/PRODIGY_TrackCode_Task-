import React, { useState, useEffect } from "react";


const API_KEY = "410a065149ab0b7361f75f379c5dc07a";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("day"); 
  
  const getWeather = async (cityName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`
      );

      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeatherData(data);
      setError("");
      7
      if (data.weather[0].main === "Clear" && data.dt > data.sys.sunrise && data.dt < data.sys.sunset) {
        setTheme("day");
      } else if (data.weather[0].main === "Clouds" && data.clouds.all > 70) {
        setTheme("cloudy");
      } else if (data.dt < data.sys.sunrise || data.dt > data.sys.sunset) {
        setTheme("night");
      }
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      getWeather(city);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clouds":
        return "https://cdn-icons-png.flaticon.com/512/414/414825.png"; 
      case "Clear":
        return "https://cdn-icons-png.flaticon.com/512/869/869869.png"; 
      case "Rain":
        return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; 
      case "Drizzle":
        return "https://cdn-icons-png.flaticon.com/512/5903/5903785.png"; 
      case "Mist":
        return "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"; 
      case "Snow":
        return "https://cdn-icons-png.flaticon.com/512/642/642102.png"; 
      case "Thunderstorm":
        return "https://cdn-icons-png.flaticon.com/512/1146/1146869.png"; 
      case "Haze":
        return "https://cdn-icons-png.flaticon.com/512/1197/1197102.png"; 
      default:
        return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; 
    }
  };

  const getBgClass = () => {
    switch (theme) {
      case "day":
        return "from-blue-400 via-sky-300 to-indigo-400";
      case "night":
        return "from-indigo-900 via-purple-900 to-blue-800";
      case "cloudy":
        return "from-slate-400 via-gray-300 to-slate-500";
      default:
        return "from-blue-400 via-sky-300 to-indigo-400";
    }
  };

  const getTextColor = () => {
    return theme === "night" ? "text-white" : "text-gray-800";
  };

  const getCardBg = () => {
    return theme === "night" 
      ? "bg-gradient-to-br from-gray-900 to-slate-800 text-white border border-gray-700" 
      : "bg-white/80 backdrop-blur-md";
  };

  useEffect(() => {
    getWeather("Mumbai");
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBgClass()} flex items-center justify-center p-4 font-sans transition-all duration-700 ease-in-out`}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {theme === "day" && (
          <div className="absolute top-4 right-8 w-24 h-24 bg-yellow-300 rounded-full blur-xl opacity-70 animate-pulse"></div>
        )}
        {theme === "night" && (
          <>
            <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full opacity-90"></div>
            <div className="absolute top-20 left-1/3 w-2 h-2 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-15 left-2/3 w-1 h-1 bg-white rounded-full opacity-90"></div>
            <div className="absolute top-40 right-1/4 w-1 h-1 bg-white rounded-full opacity-70"></div>
            <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-white rounded-full opacity-80"></div>
          </>
        )}
        {theme === "cloudy" && (
          <>
            <div className="absolute top-10 left-10 w-24 h-24 bg-gray-200 rounded-full blur-xl opacity-70"></div>
            <div className="absolute top-20 right-20 w-32 h-32 bg-gray-300 rounded-full blur-xl opacity-60"></div>
          </>
        )}
      </div>

      <div className={`${getCardBg()} p-8 rounded-3xl shadow-2xl w-full max-w-md transform hover:scale-102 transition-all duration-300 ease-in-out`}>
        <div className="relative flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 bg-white/90 backdrop-blur-sm"
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            🔍
          </button>
        </div>

        {error && (
          <div className="text-red-600 mt-4 text-center p-3 bg-red-100 rounded-lg border border-red-200 animate-bounce">
            {error}
          </div>
        )}

        {loading && !error && (
          <div className="flex justify-center items-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {weatherData && !loading && (
          <div className="text-center mt-6 relative">
            <div className="absolute -top-12 left-0 right-0 mx-auto w-32 h-32 bg-gradient-to-br from-blue-300 to-sky-400 rounded-full blur-xl opacity-30 z-0"></div>
            
            <div className="relative z-10">
              <img
                src={getWeatherIcon(weatherData.weather[0].main)}
                alt="weather icon"
                className="w-32 h-32 mx-auto mb-4 drop-shadow-xl transform hover:scale-110 transition-transform duration-300"
              />
              
              <div className="flex items-end justify-center mb-2">
                <h1 className="text-6xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {Math.round(weatherData.main.temp)}°
                </h1>
                <span className={`text-xl ml-1 mb-2 ${getTextColor()}`}>C</span>
              </div>
              
              <h2 className="text-2xl font-semibold mb-1">{weatherData.name}</h2>
              <p className={`text-lg ${theme === "night" ? "text-gray-300" : "text-gray-600"}`}>{weatherData.weather[0].main}</p>
              
              <div className="my-6 border-t border-b border-gray-200 py-4">
                <p className={`${theme === "night" ? "text-gray-300" : "text-gray-600"}`}>
                  Feels like {Math.round(weatherData.main.feels_like)}°C • {weatherData.weather[0].description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className={`flex flex-col items-center p-4 rounded-2xl ${theme === "night" ? "bg-gray-800" : "bg-blue-50"} shadow-md transform hover:-translate-y-1 transition-all duration-300`}>
                  <div className="w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-blue-100">
                    <span className="text-blue-600 text-xl">💧</span>
                  </div>
                  <p className="font-bold text-2xl">{weatherData.main.humidity}%</p>
                  <p className={`text-sm ${theme === "night" ? "text-gray-400" : "text-gray-600"}`}>Humidity</p>
                </div>
                
                <div className={`flex flex-col items-center p-4 rounded-2xl ${theme === "night" ? "bg-gray-800" : "bg-blue-50"} shadow-md transform hover:-translate-y-1 transition-all duration-300`}>
                  <div className="w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-blue-100">
                    <span className="text-blue-600 text-xl">💨</span>
                  </div>
                  <p className="font-bold text-2xl">{weatherData.wind.speed}</p>
                  <p className={`text-sm ${theme === "night" ? "text-gray-400" : "text-gray-600"}`}>Wind km/h</p>
                </div>
                
                <div className={`flex flex-col items-center p-4 rounded-2xl ${theme === "night" ? "bg-gray-800" : "bg-blue-50"} shadow-md transform hover:-translate-y-1 transition-all duration-300`}>
                  <div className="w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-blue-100">
                    <span className="text-blue-600 text-xl">🌡️</span>
                  </div>
                  <p className="font-bold text-2xl">{weatherData.main.pressure}</p>
                  <p className={`text-sm ${theme === "night" ? "text-gray-400" : "text-gray-600"}`}>Pressure</p>
                </div>
                
                <div className={`flex flex-col items-center p-4 rounded-2xl ${theme === "night" ? "bg-gray-800" : "bg-blue-50"} shadow-md transform hover:-translate-y-1 transition-all duration-300`}>
                  <div className="w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-blue-100">
                    <span className="text-blue-600 text-xl">👁️</span>
                  </div>
                  <p className="font-bold text-2xl">{weatherData.visibility / 1000}</p>
                  <p className={`text-sm ${theme === "night" ? "text-gray-400" : "text-gray-600"}`}>Visibility km</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
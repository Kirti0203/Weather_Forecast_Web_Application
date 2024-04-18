import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDayFog } from "react-icons/wi";

const Weather: React.FC = () => {
    const location = useLocation();
    const [forecastData, setForecastData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [cityName, setCityName] = useState<string>("");

    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const locationData = location.state?.weatherData;
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${locationData.coord.lat}&lon=${locationData.coord.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
                const data = await response.json();
                setForecastData(data.list.slice(0, 8)); // Show forecast for the next 24 hours (every 3 hours)
                setCityName(locationData.name);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching forecast data:", error);
                setLoading(false);
            }
        };

        fetchForecastData();
    }, [location.state]);

    const getWeatherIcon = (weatherType: string) => {
        switch (weatherType) {
            case "Clear":
                return <WiDaySunny className="text-yellow-400 w-12 h-12" />;
            case "Clouds":
                return <WiCloudy className="text-gray-400 w-12 h-12" />;
            case "Rain":
                return <WiRain className="text-blue-400 w-12 h-12" />;
            case "Snow":
                return <WiSnow className="text-white w-12 h-12" />;
            case "Mist":
                return <WiDayFog className="text-gray-400 w-12 h-12" />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-blue-300 to-blue-500 text-gray-800">
            <div className="max-w-4xl w-full bg-white bg-opacity-90 rounded-lg shadow-lg p-6 md:p-12">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => window.history.back()} className="text-blue-500 hover:text-blue-700 focus:outline-none">Go Back</button>
                    <h1 className="text-3xl md:text-4xl font-bold text-center">{cityName}</h1>
                    <div></div> {/* Adjust this div as needed to keep alignment */}
                </div>
                {loading ? (
                    <p className="text-lg">Loading...</p>
                ) : forecastData.length === 0 ? (
                    <p className="text-lg">No forecast data available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {forecastData.map((item: any, index: number) => (
                            <div key={index} className="bg-gray-200 p-6 rounded-lg flex flex-col justify-center items-center">
                                <div className="flex justify-center items-center mb-4">
                                    {getWeatherIcon(item.weather[0].main)}
                                    <h2 className="text-lg font-semibold ml-2">{new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}</h2>
                                </div>
                                <p className="text-lg">{item.weather[0].description}</p>
                                <p className="text-lg mt-2">{item.main.temp.toFixed(0)}°C</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;

// pages/city/[cityId].tsx
"use client";
import CurrentWeather, { WeatherProps } from "../../components/CurrentWeather";
import HourlyForecast, { ForecastProps } from "../../components/HourlyForecast";

type CityWeatherPageProps = {
  weather: WeatherProps | null;
  forecast: ForecastProps["forecast"] | null;
  error: string | null;
};

export default function CityWeatherPage({
  weather,
  forecast,
  error,
}: CityWeatherPageProps) {
  // If there's an error, show it to the user
  if (error) {
    return <p className='text-red-500'>Error: {error}</p>;
  }

  // Show loading state if weather or forecast is missing
  if (!weather || !forecast) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white'>
      {/* Back button */}
      <a href='/' className='text-left w-full mb-4 text-white'>
        &larr; Home
      </a>

      {/* Weather Display Section - Using the CurrentWeather component */}
      <CurrentWeather {...weather} />

      {/* 12-Hour Forecast Section - Using the HourlyForecast component */}
      <h2 className='text-2xl font-bold mt-8'>12 Hour Forecast</h2>
      <HourlyForecast
        forecast={forecast}
        convertToFahrenheit={function (temp: number): number {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}

// Fetch data server-side with getServerSideProps
export async function getServerSideProps(context: { params: { cityId: any } }) {
  const { cityId } = context.params; // Access the cityId parameter from the URL
  let weather = null;
  let forecast = null;
  let error = null;

  try {
    // Fetch current weather data
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    );
    if (!weatherRes.ok) throw new Error("Failed to fetch weather data");
    weather = await weatherRes.json();

    // Fetch forecast data
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    );
    if (!forecastRes.ok) throw new Error("Failed to fetch forecast data");
    forecast = await forecastRes.json();
  } catch (err) {
    error = (err as Error).message;
  }

  return {
    props: {
      weather,
      forecast,
      error,
    },
  };
}

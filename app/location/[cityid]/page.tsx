// app/city/[cityId]/page.tsx
import CurrentWeather, { WeatherProps } from "../../components/CurrentWeather";
import HourlyForecast, { ForecastProps } from "../../components/HourlyForecast";
import { notFound } from "next/navigation";

// Server component to fetch data and render CityWeatherPage
async function fetchWeatherData(cityId: string) {
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
  );
  if (!weatherRes.ok) {
    console.error("Failed to fetch weather data");
    return null;
  }
  return weatherRes.json();
}

async function fetchForecastData(cityId: string) {
  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
  );
  if (!forecastRes.ok) {
    console.error("Failed to fetch forecast data");
    return null;
  }
  return forecastRes.json();
}

export default async function CityWeatherPage({
  params,
}: {
  params: { cityId: string };
}) {
  const { cityId } = params;

  // Fetch weather and forecast data
  const weather = await fetchWeatherData(cityId);
  const forecast = await fetchForecastData(cityId);

  // Handle cases where data fetching fails
  if (!weather || !forecast) {
    notFound();
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white'>
      <a href='/' className='text-left w-full mb-4 text-white'>
        &larr; Home
      </a>

      {/* Render the CurrentWeather and HourlyForecast components */}
      <CurrentWeather {...weather} />
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

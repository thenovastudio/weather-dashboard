import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar.jsx'
import CurrentWeather from './components/CurrentWeather.jsx'
import Forecast from './components/Forecast.jsx'

const API_KEY = 'YOUR_OPENWEATHER_API_KEY' // Replace with your key from openweathermap.org

export default function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [unit, setUnit] = useState('metric') // 'metric' = C, 'imperial' = F
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('weather_history')
    return saved ? JSON.parse(saved) : []
  })

  const fetchWeather = async (city) => {
    if (!city.trim()) return
    setLoading(true)
    setError('')
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`)
      ])

      if (!weatherRes.ok) throw new Error('City not found. Please try again.')

      const weatherData = await weatherRes.json()
      const forecastData = await forecastRes.json()

      setWeather(weatherData)
      setForecast(forecastData)

      setHistory(prev => {
        const updated = [city, ...prev.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 5)
        localStorage.setItem('weather_history', JSON.stringify(updated))
        return updated
      })
    } catch (err) {
      setError(err.message)
      setWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (weather) {
      fetchWeather(weather.name)
    }
  }, [unit])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
        <button
          className="unit-toggle"
          onClick={() => setUnit(u => u === 'metric' ? 'imperial' : 'metric')}
        >
          {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
        </button>
      </header>

      <SearchBar onSearch={fetchWeather} history={history} />

      {loading && <div className="loading">Fetching weather...</div>}
      {error && <div className="error">{error}</div>}

      {weather && !loading && (
        <>
          <CurrentWeather data={weather} unit={unit} />
          {forecast && <Forecast data={forecast} unit={unit} />}
        </>
      )}

      {!weather && !loading && !error && (
        <div className="placeholder">
          <div className="placeholder-icon">🌤️</div>
          <p>Search for a city to see the weather</p>
        </div>
      )}
    </div>
  )
}

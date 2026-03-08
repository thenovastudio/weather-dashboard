import React from 'react'

export default function CurrentWeather({ data, unit }) {
  const { name, sys, main, weather, wind, visibility } = data
  const icon = weather[0].icon
  const description = weather[0].description
  const unitSymbol = unit === 'metric' ? '°C' : '°F'
  const windUnit = unit === 'metric' ? 'm/s' : 'mph'

  return (
    <div className="current-weather">
      <div className="cw-location">
        <h2>{name}, {sys.country}</h2>
        <p className="cw-description">{description}</p>
      </div>

      <div className="cw-main">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="cw-icon"
        />
        <div className="cw-temp">{Math.round(main.temp)}{unitSymbol}</div>
      </div>

      <div className="cw-details">
        <div className="cw-detail-item">
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{Math.round(main.feels_like)}{unitSymbol}</span>
        </div>
        <div className="cw-detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{main.humidity}%</span>
        </div>
        <div className="cw-detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{wind.speed} {windUnit}</span>
        </div>
        <div className="cw-detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{(visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="cw-detail-item">
          <span className="detail-label">Min / Max</span>
          <span className="detail-value">{Math.round(main.temp_min)}{unitSymbol} / {Math.round(main.temp_max)}{unitSymbol}</span>
        </div>
        <div className="cw-detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{main.pressure} hPa</span>
        </div>
      </div>
    </div>
  )
}

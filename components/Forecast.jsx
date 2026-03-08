import React from 'react'

export default function Forecast({ data, unit }) {
  const unitSymbol = unit === 'metric' ? '°C' : '°F'

  const daily = {}
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000)
    const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    const hour = date.getHours()
    if (!daily[day] || Math.abs(hour - 12) < Math.abs(new Date(daily[day].dt * 1000).getHours() - 12)) {
      daily[day] = item
    }
  })

  const days = Object.entries(daily).slice(0, 5)

  return (
    <div className="forecast">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {days.map(([day, item]) => (
          <div className="forecast-card" key={day}>
            <div className="fc-day">{day.split(',')[0]}</div>
            <div className="fc-date">{day.split(',')[1]?.trim()}</div>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="fc-icon"
            />
            <div className="fc-desc">{item.weather[0].main}</div>
            <div className="fc-temps">
              <span className="fc-high">{Math.round(item.main.temp_max)}{unitSymbol}</span>
              <span className="fc-low">{Math.round(item.main.temp_min)}{unitSymbol}</span>
            </div>
            <div className="fc-humidity">💧 {item.main.humidity}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

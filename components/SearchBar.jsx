import React, { useState } from 'react'

export default function SearchBar({ onSearch, history }) {
  const [input, setInput] = useState('')
  const [showHistory, setShowHistory] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
      setShowHistory(false)
    }
  }

  const handleHistoryClick = (city) => {
    setInput(city)
    onSearch(city)
    setShowHistory(false)
  }

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search city..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 150)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {showHistory && history.length > 0 && (
        <ul className="history-dropdown">
          {history.map((city, i) => (
            <li key={i} onMouseDown={() => handleHistoryClick(city)}>
              <span className="history-icon">🕐</span> {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

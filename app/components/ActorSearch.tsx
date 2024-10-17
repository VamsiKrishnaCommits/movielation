'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const ActorSearch = ({ onSelect, placeholder, selectedActor }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (selectedActor) {
      setQuery(selectedActor.name)
      setIsOpen(false)
      setResults([])
    }
  }, [selectedActor])

  useEffect(() => {
    const fetchActors = async () => {
      if (query.length > 2) {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data)
        setIsOpen(true)
      } else {
        setResults([])
        setIsOpen(false)
      }
    }

    const timeoutId = setTimeout(fetchActors, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  const handleSelect = (actor) => {
    onSelect(actor)
    setQuery(actor.name)
    setIsOpen(false)
    setResults([])
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    if (selectedActor && e.target.value !== selectedActor.name) {
      onSelect(null)
    }
  }

  return (
    <div className="search-wrapper">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="search-input"
      />
      {isOpen && results.length > 0 && (
        <ul className="results-list">
          {results.map((actor) => (
            <li key={actor.id} onClick={() => handleSelect(actor)} className="result-item">
              <Image
                src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                alt={actor.name}
                width={45}
                height={68}
                className="actor-image"
              />
              <span>{actor.name}</span>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .search-wrapper {
          position: relative;
          width: 100%;
        }
        .search-input {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 2px solid #ddd;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .search-input:focus {
          outline: none;
          border-color: #0070f3;
          box-shadow: 0 0 0 3px rgba(0,112,243,0.2);
        }
        .results-list {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: white;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 8px 8px;
          max-height: 300px;
          overflow-y: auto;
          list-style-type: none;
          padding: 0;
          margin: 0;
          z-index: 1000;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .result-item {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .result-item:hover {
          background-color: #f0f0f0;
        }
        .actor-image {
          margin-right: 10px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}

export default ActorSearch

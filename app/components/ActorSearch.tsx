'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const ActorSearch = ({ onSelect, placeholder, selectedActor }: { onSelect: (actor: any) => void, placeholder: string, selectedActor: any }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (selectedActor) {
      setIsOpen(false)
      setQuery(selectedActor.name)
      setResults([])
    }
  }, [selectedActor])

  useEffect(() => {
    const fetchActors = async () => {
      if (query.length > 2 && query !== selectedActor?.name) {
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  const handleSelect = (actor) => {
    onSelect(actor)
    setQuery(actor.name)
    setIsOpen(false)
    setResults([])
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (selectedActor && value !== selectedActor.name) {
      onSelect(null)
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
      />
      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {results.map((actor) => (
            <li
              key={actor.id}
              onMouseDown={() => handleSelect(actor)}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100"
            >
              <div className="flex items-center">
                <Image
                  src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                  alt={actor.name}
                  width={45}
                  height={68}
                  className="flex-shrink-0 rounded"
                />
                <span className="ml-3 block truncate text-gray-900">{actor.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ActorSearch

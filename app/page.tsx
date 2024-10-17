'use client'

import { useState } from 'react'
import ActorSearch from './components/ActorSearch'
import ConnectionDisplay from './components/ConnectionDisplay'

export default function Home() {
  const [actor1, setActor1] = useState(null)
  const [actor2, setActor2] = useState(null)
  const [connection, setConnection] = useState(null)

  const handleFindConnection = async () => {
    if (actor1 && actor2) {
      const response = await fetch('/api/connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actor1: actor1.id, actor2: actor2.id }),
      })
      const data = await response.json()
      setConnection(data)
    }
  }

  return (
    <main className="main">
      <h1 className="title">Actor Connection Finder</h1>
      <div className="search-container">
        <ActorSearch onSelect={setActor1} placeholder="Search for first actor" selectedActor={actor1} />
        <ActorSearch onSelect={setActor2} placeholder="Search for second actor" selectedActor={actor2} />
      </div>
      <button 
        className="find-button" 
        onClick={handleFindConnection}
        disabled={!actor1 || !actor2}
      >
        Find Connection
      </button>
      {connection && <ConnectionDisplay connection={connection} />}
      <style jsx>{`
        .main {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          min-height: 100vh;
          background-color: #f5f5f5;
          font-family: Arial, sans-serif;
        }
        .title {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          text-align: center;
          color: #333;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        .search-container {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          width: 100%;
          max-width: 800px;
        }
        .find-button {
          padding: 0.75rem 1.5rem;
          font-size: 1.1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .find-button:hover {
          background-color: #0051a2;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .find-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      `}</style>
    </main>
  )
}

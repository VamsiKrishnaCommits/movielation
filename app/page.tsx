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
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl overflow-visible">
          <div className="px-6 py-8 sm:p-10">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Movielation: Actor Connection Finder
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Discover how actors are connected through their movie collaborations. 
              Enter two actors' names and uncover the degrees of separation between them!
            </p>
            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <ActorSearch onSelect={setActor1} placeholder="Search for first actor" selectedActor={actor1} />
              </div>
              <div className="flex-1">
                <ActorSearch onSelect={setActor2} placeholder="Search for second actor" selectedActor={actor2} />
              </div>
            </div>
            <button 
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              onClick={handleFindConnection}
              disabled={!actor1 || !actor2}
            >
              Find Connection
            </button>
          </div>
          {connection && (
            <div className="border-t border-gray-200">
              <ConnectionDisplay connection={connection} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

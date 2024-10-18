'use client'

import { useState } from 'react'
import ActorSearch from './components/ActorSearch'
import ConnectionDisplay from './components/ConnectionDisplay'

export default function Home() {
  const [actor1, setActor1] = useState(null)
  const [actor2, setActor2] = useState(null)
  const [connection, setConnection] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFindConnection = async () => {
    if (actor1 && actor2) {
      setIsLoading(true)
      try {
        const response = await fetch('/api/connection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ actor1: actor1.id, actor2: actor2.id }),
        })
        const data = await response.json()
        setConnection(data)
      } catch (error) {
        console.error('Error finding connection:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-lg shadow-2xl overflow-visible">
          <div className="px-4 py-6 sm:p-6">
            <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
              Actor Connection Finder
            </h1>
            <div className="space-y-4 mb-6">
              <ActorSearch onSelect={setActor1} placeholder="Search for first actor" selectedActor={actor1} />
              <ActorSearch onSelect={setActor2} placeholder="Search for second actor" selectedActor={actor2} />
            </div>
            <button 
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              onClick={handleFindConnection}
              disabled={!actor1 || !actor2 || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Finding Connection...
                </span>
              ) : (
                'Find Connection'
              )}
            </button>
          </div>
          {connection && <ConnectionDisplay connection={connection} />}
        </div>
      </div>
    </main>
  )
}

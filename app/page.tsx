'use client'

import { useState, useEffect } from 'react'
import ActorSearch from './components/ActorSearch'
import ConnectionDisplay from './components/ConnectionDisplay'
import Introduction from './components/Introduction'
import AnimatedBackground from './components/AnimatedBackground'
import CreatorInfo from './components/CreatorInfo'
import SearchStats from './components/SearchStats'
import { FaUsers, FaRobot, FaNetworkWired } from 'react-icons/fa'
import CountUp from 'react-countup'

export default function Home() {
  const [actor1, setActor1] = useState(null)
  const [actor2, setActor2] = useState(null)
  const [connection, setConnection] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [totalActors, setTotalActors] = useState(0)

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
        setConnection({
          ...data,
          actor1Name: actor1.name,
          actor2Name: actor2.name,
        })
      } catch (error) {
        console.error('Error finding connection:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const fetchTotalActors = async () => {
    try {
      const response = await fetch('/api/totalActors')
      const data = await response.json()
      setTotalActors(data.totalActors)
    } catch (error) {
      console.error('Error fetching total actors:', error)
    }
  }

  useEffect(() => {
    fetchTotalActors()
  }, [])

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      <AnimatedBackground />
      <div className="max-w-4xl mx-auto">
        <div className="bg-opacity-20 bg-black rounded-lg shadow-neon overflow-visible backdrop-filter backdrop-blur-lg border border-purple-500 p-8">
          <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 text-glow">
            Movielation
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 justify-center">
            <div className="md:col-start-2">
              <StatsCard icon={<FaUsers />} label="Connected Actors" value={totalActors} />
            </div>
          </div>
          <Introduction />
          <div className="space-y-4 mb-6">
            <ActorSearch onSelect={setActor1} placeholder="Search for first Telugu actor" selectedActor={actor1} />
            <ActorSearch onSelect={setActor2} placeholder="Search for second Telugu actor" selectedActor={actor2} />
          </div>
          <button 
            className="w-full py-4 px-6 border-2 border-purple-500 rounded-full shadow-neon text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-1"
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
              'Discover the Connection!'
            )}
          </button>
        </div>
        {connection && <ConnectionDisplay connection={connection} />}
        {connection && <SearchStats connection={connection} />}
      </div>
      <CreatorInfo />
    </main>
  )
}

const StatsCard = ({ icon, label, value }) => (
  <div className="bg-opacity-20 bg-black rounded-lg p-4 flex items-center space-x-3 shadow-neon border border-purple-500">
    <div className="text-purple-400 text-3xl">{icon}</div>
    <div>
      <div className="text-sm font-medium text-purple-300">{label}</div>
      <div className="text-2xl font-bold text-purple-100">
        <CountUp end={value} duration={2} />
      </div>
    </div>
  </div>
)

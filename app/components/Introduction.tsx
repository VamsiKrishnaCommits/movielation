'use client'

import { useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'

const Introduction = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 px-4 bg-opacity-20 bg-purple-500 text-purple-100 font-semibold rounded-md hover:bg-opacity-30 transition duration-300 flex items-center justify-between border border-purple-500 shadow-neon"
      >
        <span className="flex items-center">
          <FaInfoCircle className="mr-2" />
          What is Movielation?
        </span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-4 p-4 bg-opacity-20 bg-black rounded-md shadow-neon border border-purple-500">
          <p className="text-purple-100 mb-3">
            Movielation is your gateway to the fascinating world of Telugu cinema connections! 
            Inspired by the "Six Degrees of Kevin Bacon" game, Movielation reveals the hidden 
            links between Telugu actors through their movie collaborations.
          </p>
          <p className="text-purple-100 mb-3">
            Here's how it works:
          </p>
          <ol className="list-decimal list-inside text-purple-100 mb-3">
            <li>Choose any two Telugu actors</li>
            <li>Click "Discover the Connection!"</li>
            <li>Explore the shortest path connecting them through shared movies</li>
          </ol>
          <p className="text-purple-200 italic">
            Note: Currently, Movielation supports Telugu movies only. We're working on expanding 
            to other film industries soon!
          </p>
        </div>
      )}
    </div>
  )
}

export default Introduction

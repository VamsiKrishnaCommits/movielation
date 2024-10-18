'use client'

import { useState } from 'react'

const Introduction = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 px-4 bg-indigo-100 text-indigo-700 font-semibold rounded-md hover:bg-indigo-200 transition duration-300 flex items-center justify-between"
      >
        <span>What is Movielation?</span>
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
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
          <p className="text-gray-700 mb-3">
            Movielation is your gateway to the fascinating world of Telugu cinema connections! 
            Inspired by the "Six Degrees of Kevin Bacon" game, Movielation reveals the hidden 
            links between Telugu actors through their movie collaborations.
          </p>
          <p className="text-gray-700 mb-3">
            Here's how it works:
          </p>
          <ol className="list-decimal list-inside text-gray-700 mb-3">
            <li>Choose any two Telugu actors</li>
            <li>Click "Find Connection"</li>
            <li>Discover the shortest path connecting them through shared movies</li>
          </ol>
          <p className="text-gray-700 mb-3">
            Whether you're a die-hard Telugu cinema fan or just curious about the industry's 
            interconnections, Movielation offers a fun way to explore the rich tapestry of 
            Telugu films and their stars.
          </p>
          <p className="text-gray-600 italic">
            Note: Currently, Movielation supports Telugu movies only. We're working on expanding 
            to other film industries soon!
          </p>
        </div>
      )}
    </div>
  )
}

export default Introduction


import React from 'react'
import { FaUserFriends, FaClock, FaSearch, FaChartLine } from 'react-icons/fa'

interface SearchStatsProps {
  connection: {
    actor1Name: string
    actor2Name: string
    path: string[]
    searchTime: number
    nodesExplored: number
    maxDepthReached: number
  }
}

const SearchStats: React.FC<SearchStatsProps> = ({ connection }) => {
  return (
    <div className="bg-opacity-20 bg-black rounded-lg shadow-neon border border-purple-500 p-6 mt-6">
      <h2 className="text-2xl font-bold text-purple-100 mb-4 flex items-center text-glow">
        <FaChartLine className="mr-2" />
        Search Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatItem
          icon={<FaUserFriends />}
          label="Degrees of Separation"
          value={connection.path.length - 1}
        />
        <StatItem
          icon={<FaClock />}
          label="Search Time"
          value={`${connection.searchTime.toFixed(2)} ms`}
        />
        <StatItem
          icon={<FaSearch />}
          label="Nodes Explored"
          value={connection.nodesExplored}
        />
        <StatItem
          icon={<FaChartLine />}
          label="Max Depth Reached"
          value={connection.maxDepthReached}
        />
      </div>
    </div>
  )
}

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 bg-opacity-20 bg-purple-500 p-3 rounded-lg border border-purple-400 shadow-neon">
    <div className="text-purple-300 text-xl">{icon}</div>
    <div>
      <div className="text-sm font-medium text-purple-200">{label}</div>
      <div className="text-lg font-semibold text-purple-100">{value}</div>
    </div>
  </div>
)

export default SearchStats

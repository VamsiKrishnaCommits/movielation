import Image from 'next/image'
import { FaArrowDown } from 'react-icons/fa'

const ConnectionDisplay = ({ connection }) => {
  return (
    <div className="bg-opacity-20 bg-black p-6 rounded-lg shadow-neon border border-purple-500 mt-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-100 text-glow">Connection Found</h2>
      <div className="space-y-4">
        {connection.path.map((actor, index) => (
          <div key={actor.id} className="flex items-center">
            <div className="flex-shrink-0 w-16 h-16 mr-4 rounded-full overflow-hidden border-2 border-purple-500 shadow-neon">
              <Image
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <p className="font-medium text-purple-100">{actor.name}</p>
              {index < connection.path.length - 1 && (
                <p className="text-sm text-purple-300 mt-1 flex items-center">
                  <FaArrowDown className="mr-2" />
                  {connection.movies[index][0]}
                  {connection.movies[index].length > 1 && ` (+${connection.movies[index].length - 1} more)`}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConnectionDisplay

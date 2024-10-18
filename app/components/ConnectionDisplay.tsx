import Image from 'next/image'

const ConnectionDisplay = ({ connection }) => {
  return (
    <div className="bg-white p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Connection Found</h2>
      <div className="space-y-4">
        {connection.path.map((actor, index) => (
          <div key={actor.id} className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 mr-4">
              <Image
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div className="flex-grow">
              <p className="font-medium text-gray-800">{actor.name}</p>
              {index < connection.path.length - 1 && (
                <p className="text-sm text-gray-500 mt-1">
                  ↓ {connection.movies[index][0]}
                  {connection.movies[index].length > 1 && ` (+${connection.movies[index].length - 1} more)`}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-gray-600">
        Degrees of separation: {connection.path.length - 1}
      </p>
    </div>
  )
}

export default ConnectionDisplay

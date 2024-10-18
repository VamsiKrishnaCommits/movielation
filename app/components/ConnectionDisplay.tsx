import Image from 'next/image'

const ConnectionDisplay = ({ connection }) => {
  return (
    <div className="bg-white p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Connection Found!</h2>
      <div className="flex flex-col items-center max-w-md mx-auto">
        {connection.path.map((actor, index) => (
          <div key={actor.id} className="w-full">
            <div className="flex items-center mb-4">
              <Image
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                width={60}
                height={90}
                className="rounded-full border-2 border-indigo-500"
              />
              <span className="ml-4 font-semibold text-lg text-gray-800">{actor.name}</span>
            </div>
            {index < connection.path.length - 1 && (
              <div className="ml-8 mb-4">
                <p className="text-sm font-medium text-indigo-600">Appeared with {connection.path[index + 1].name} in:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {connection.movies[index].map((movie, movieIndex) => (
                    <li key={movieIndex}>{movie}</li>
                  ))}
                </ul>
                <div className="border-l-2 border-indigo-500 h-8 ml-4 my-2"></div>
              </div>
            )}
          </div>
        ))}
        <p className="mt-6 text-lg font-medium text-indigo-700">
          Degrees of separation: {connection.path.length - 1}
        </p>
      </div>
    </div>
  )
}

export default ConnectionDisplay

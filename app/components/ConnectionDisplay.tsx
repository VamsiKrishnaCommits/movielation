import Image from 'next/image'

const ConnectionDisplay = ({ connection }) => {
  return (
    <div className="bg-white overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Connection Found!</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Degrees of separation: {connection.path.length - 1}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {connection.path.map((actor, index) => (
            <div key={actor.id} className={index % 2 === 0 ? 'bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6' : 'bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'}>
              <dt className="text-sm font-medium text-gray-500">
                <div className="flex items-center">
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    width={92}
                    height={138}
                    className="rounded-md shadow-md"
                  />
                  <span className="ml-3 text-lg font-semibold">{actor.name}</span>
                </div>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {index < connection.path.length - 1 && (
                  <div>
                    <p className="font-medium text-indigo-600">Appeared with {connection.path[index + 1].name} in:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {connection.movies[index].map((movie) => (
                        <li key={movie} className="text-gray-700">{movie}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default ConnectionDisplay

import Image from 'next/image'

const ConnectionDisplay = ({ connection }) => {
  return (
    <div className="connection-container">
      <h2 className="connection-title">Connection Found!</h2>
      <div className="actors-container">
        {connection.path.map((actor, index) => (
          <div key={actor.id} className="actor-connection">
            <div className="actor-card">
              <Image
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                width={185}
                height={278}
                className="actor-image"
              />
              <p className="actor-name">{actor.name}</p>
            </div>
            {index < connection.path.length - 1 && (
              <div className="connection-arrow">
                <span className="arrow">→</span>
                <div className="movie-connection">
                  <p>Appeared together in:</p>
                  <ul>
                    {connection.movies[index].map((movie) => (
                      <li key={movie}>{movie}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        .connection-container {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          margin-top: 2rem;
        }
        .connection-title {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
          font-size: 1.8rem;
        }
        .actors-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
        .actor-connection {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        .actor-card {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .actor-image {
          border-radius: 8px;
        }
        .actor-name {
          margin: 10px 0;
          font-weight: bold;
        }
        .connection-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 20px;
        }
        .arrow {
          font-size: 2rem;
          color: #0070f3;
        }
        .movie-connection {
          margin-top: 10px;
          font-size: 0.9em;
          text-align: center;
        }
        .movie-connection ul {
          list-style-type: none;
          padding: 0;
        }
        .movie-connection li {
          margin: 5px 0;
        }
      `}</style>
    </div>
  )
}

export default ConnectionDisplay

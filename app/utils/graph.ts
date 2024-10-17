interface Actor {
  id?: string | null | undefined;
  name?: string | null | undefined;
  profile_path?: string | null | undefined;
}

interface ActorConnections {
  graph: {
    [key: string]: {
      [key: string]: string[];
    };
  };
  people: {
    [key: string]: Actor;
  };
}

export function findConnection(actorConnections: ActorConnections, actor1Id: string, actor2Id: string) {
  const queue: { path: string[]; movies: string[][] }[] = [{ path: [actor1Id], movies: [] }];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const { path, movies } = queue.shift()!;
    const currentActor = path[path.length - 1];

    if (currentActor === actor2Id) {
      return {
        path: path.map(id => actorConnections.people[id]),
        movies,
      };
    }

    if (!visited.has(currentActor)) {
      visited.add(currentActor);

      const connections = actorConnections.graph[currentActor] || {};
      for (const [connectedActor, sharedMovies] of Object.entries(connections)) {
        if (!visited.has(connectedActor)) {
          queue.push({
            path: [...path, connectedActor],
            movies: [...movies, sharedMovies],
          });
        }
      }
    }
  }

  return null; // No connection found
}

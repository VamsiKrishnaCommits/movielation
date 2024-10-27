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
  const queue: { path: string[]; movies: string[][]; depth: number }[] = [{ path: [actor1Id], movies: [], depth: 0 }];
  const visited = new Set<string>();
  let nodesExplored = 0;
  let maxDepthReached = 0;

  while (queue.length > 0) {
    const { path, movies, depth } = queue.shift()!;
    const currentActor = path[path.length - 1];
    nodesExplored++;
    maxDepthReached = Math.max(maxDepthReached, depth);

    if (currentActor === actor2Id) {
      return {
        path: path.map(id => actorConnections.people[id]),
        movies,
        nodesExplored,
        maxDepthReached,
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
            depth: depth + 1,
          });
        }
      }
    }
  }

  return { path: null, movies: null, nodesExplored, maxDepthReached };
}

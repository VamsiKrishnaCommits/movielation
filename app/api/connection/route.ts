import { NextResponse } from 'next/server'
import actorConnections from '../telugu_movie_data.json'
import { findConnection } from '@/app/utils/graph'

export async function POST(request: Request) {
  const { actor1, actor2 } = await request.json()
  const startTime = performance.now()
  const connection = findConnection(actorConnections, actor1, actor2)
  const endTime = performance.now()
  const searchTime = endTime - startTime

  return NextResponse.json({
    ...connection,
    searchTime,
    actor1Id: actor1,
    actor2Id: actor2,
  })
}

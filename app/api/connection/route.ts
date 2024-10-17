import { NextResponse } from 'next/server'
import actorConnections from '../telugu_movie_data.json'
import { findConnection } from '@/app/utils/graph'

export async function POST(request: Request) {
  const { actor1, actor2 } = await request.json()
  const connection = findConnection(actorConnections, actor1, actor2)
  return NextResponse.json(connection)
}

import { NextResponse } from 'next/server'
import actorConnections from '../telugu_movie_data.json'

export async function GET() {
  const totalActors = Object.keys(actorConnections.people).length
  return NextResponse.json({ totalActors })
}


import { NextResponse } from 'next/server'
import actorConnections from '../telugu_movie_data.json'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ message: 'Query parameter is required' }, { status: 400 })
  }

  const results = Object.entries(actorConnections.people)
    .filter(([_, actor]) => actor.name.toLowerCase().includes(query.toLowerCase()))
    .map(([id, actor]) => ({
      id,
      name: actor.name,
      profile_path: actor.profile_path
    }))
    .slice(0, 5)

  return NextResponse.json(results)
}

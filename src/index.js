import { db } from './database/client.js'

const statement = db.prepare(`SELECT json_object(
  'game_' || id, json_object(
    'total_kills', total_kills,
    'players', json(players),
    'kills', json(kills),
    'kills_by_means', json(kills_by_means)
  )
) AS response
FROM games;`)

const games = statement.all().map((item) => JSON.parse(item.response))

console.log(JSON.stringify(games, null, 2))
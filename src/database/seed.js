import readline from 'node:readline'
import fs from 'node:fs'
import { db } from './client.js'

const log = fs.createReadStream('./src/database/qgames.txt')

const rl = readline.createInterface({
  input: log,
  crlfDelay: Infinity,
})

let totalKills = 0
let players = []
let kills = {}
let killsByMeans = {}

rl.on('line', async (line) => {
  if (line.includes('InitGame')) {
    // Reset all variables
    totalKills = 0
    players = []
    kills = {}
    killsByMeans = {}
  }

  if (line.includes('ShutdownGame')) {
    // Save all data
    const statement = db
      .prepare('INSERT INTO games (total_kills, players, kills, kills_by_means) VALUES (?, ?, ?, ?)')
      statement
        .run(
          totalKills,
          JSON.stringify(players),
          JSON.stringify(kills),
          JSON.stringify(killsByMeans),
        )
  }

  if (line.includes('ClientUserinfoChanged')) {
    const player = line.split('n\\')[1].split('\\t')[0]
    players.push(player)
  }

  if (line.includes('Kill')) {
    totalKills += 1

    const [part1, part2] = line.split('Kill:')[1].split('killed')
    const killer = part1.trim().split(': ')[1].trim()
    const [killed, means] = part2.trim().split('by').map((item) => item.trim())

    if (killer === '<world>') {
      kills[killed] = (kills[killed] || 0) - 1
    } else {
      kills[killer] = (kills[killer] || 0) + 1
    }

    killsByMeans[means.trim()] = (killsByMeans[means.trim()] || 0) + 1
  }
})

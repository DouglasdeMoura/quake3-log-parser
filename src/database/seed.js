import readline from 'node:readline'
import fs from 'node:fs'

const log = fs.createReadStream('./src/database/qgames.txt')

const rl = readline.createInterface({
  input: log,
  crlfDelay: Infinity,
})

let totalKills = 0
let players = []
let kills = {}
let killsByMeans = {}

// Process each line
rl.on('line', async (line) => {
  if (line.includes('InitGame')) {
    console.log('Game started')
    console.log('')

    totalKills = 0
    players = []
    kills = {}
    killsByMeans = {}
  }

  if (line.includes('ShutdownGame')) {
    console.log('Game ended')

    console.log('Total kills:', totalKills)
    console.log('Players:', Array.from(new Set([...players])))
    console.log('Kills:', kills)
    console.log('Kills by means:', killsByMeans)
    console.log('-----------------------------------')
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

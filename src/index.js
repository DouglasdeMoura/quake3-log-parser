import readline from 'node:readline'
import fs from 'node:fs'
import { GameStatistics } from './lib/game-statistics.js'

const log = fs.createReadStream('./src/database/qgames.txt')

const rl = readline.createInterface({
  input: log,
})

const gameStats = new GameStatistics()

rl.on('line', gameStats.processLine)

rl.on('close', () => {
  console.log(gameStats.games)
})
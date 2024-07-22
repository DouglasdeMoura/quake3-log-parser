import { GameStatistics } from './lib/game-statistics.js'
import fs from 'node:fs'

const gameStats = new GameStatistics('./src/database/qgames.txt')

const outputStream = fs.createWriteStream('./output.json')

let isFirstGame = true

gameStats.processLog()
  .on('data', (chunk) => {
    if (!isFirstGame) {
      outputStream.write(',\n')
    } else {
      outputStream.write('[\n')
      isFirstGame = false
    }
    outputStream.write(chunk)
  })
  .on('end', () => {
    // Write the closing bracket of the JSON array
    outputStream.write('\n]')
    outputStream.end()
    console.log('Processing complete. Results written to output.json')
  })
  .on('error', (error) => {
    console.error('Error processing log:', error)
  })
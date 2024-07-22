import { GameStatistics } from './lib/game-statistics.js'
import fs from 'node:fs'

const gameStats = new GameStatistics('./src/database/qgames.txt')

// gameStats.on('gameAdded', (game) => {
//   console.log('New game added:', game)
// })

// gameStats.on('playerAdded', (player) => {
//   console.log('New player added:', player)
// })

// gameStats.on('killAdded', (kill) => {
//   console.log('New kill added:', kill)
// })

// gameStats.on('processingComplete', (games) => {
//   console.log('All games processed:', games)
// })

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
// gameStats.processLog()
//   .then((games) => {
//     console.log('Processing complete. Total games:', Object.keys(games).length)
//   })
//   .catch((error) => {
//     console.error('Error processing log:', error)
//   })

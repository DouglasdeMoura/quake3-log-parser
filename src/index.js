import { GameStatistics } from './lib/game-statistics.js'

const gameStats = new GameStatistics('./src/database/qgames.txt')

gameStats.on('gameAdded', (game) => {
  console.log('New game added:', game)
})

gameStats.on('playerAdded', (player) => {
  console.log('New player added:', player)
})

gameStats.on('killAdded', (kill) => {
  console.log('New kill added:', kill)
})

gameStats.on('processingComplete', (games) => {
  console.log('All games processed:', games)
})

gameStats.processLog()
  .then((games) => {
    console.log('Processing complete. Total games:', Object.keys(games).length)
  })
  .catch((error) => {
    console.error('Error processing log:', error)
  })

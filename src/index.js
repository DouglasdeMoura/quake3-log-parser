import fs from 'node:fs'
import { GameStatistics } from './lib/game-statistics.js'
import { listify } from './lib/listify.js'
import { formatTitle } from './lib/format-title.js'

const gameStats = new GameStatistics('./src/database/qgames.txt')

const outputStream = fs.createWriteStream('./output.json')
const reportStream = fs.createWriteStream('./report.txt')

let isFirstGame = true
let allPlayers = {}

function generateMatchReport(game) {
  const [gameId, gameData] = Object.entries(game)[0]

  let report = formatTitle(gameId)
  report += `Total kills: ${gameData.total_kills}\n`
  report += `Players: ${listify(gameData.players)}\n`

  report += 'Kills:\n'

  Object.entries(gameData.kills)
    .sort(([, a], [, b]) => b - a)
    .forEach(([player, kills]) => {
      report += `  ${player}: ${kills}\n`
      // Update all players data
      if (!allPlayers[player]) allPlayers[player] = 0
      allPlayers[player] += kills
    })

  report += 'Kills by means:\n'

  Object
    .entries(gameData.kills_by_means)
    .sort(([, a], [, b]) => b - a)
    .forEach(([means, count]) => {
      report += `  ${means}: ${count}\n`
    })

  return report
}

function generatePlayerRanking() {
  const sortedPlayers = Object.entries(allPlayers)
    .sort(([, a], [, b]) => b - a)

  let ranking = '\n===| PLAYER RANKING |===\n'

  sortedPlayers
    .forEach(([player, score], index) => {
      ranking += `${index + 1}. ${player}: ${score}\n`
    })

  return ranking
}

gameStats.processLog()
  .on('data', (chunk) => {
    if (!isFirstGame) {
      outputStream.write(',\n')
    } else {
      outputStream.write('[\n')
      isFirstGame = false
    }
    outputStream.write(chunk)

    // Generate and write match report
    const game = JSON.parse(chunk)
    const report = generateMatchReport(game)
    reportStream.write(report)
  })
  .on('end', () => {
    // Write the closing bracket of the JSON array
    outputStream.write('\n]')
    outputStream.end()

    // Generate and write player ranking
    const ranking = generatePlayerRanking()
    reportStream.write(ranking)
    reportStream.end(() => {
      console.log(fs.readFileSync('./report.txt', 'utf8'))
    })
  })
  .on('error', (error) => {
    console.error('Error processing log:', error)
  })
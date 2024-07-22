import readline from 'node:readline'
import fs from 'node:fs'
import { Readable } from 'node:stream'

export class GameStatistics extends Readable {
  /**
   * @param {string} logFilePath
   */
  constructor(logFilePath) {
    super()
    this.totalGames = 0
    this.totalKills = 0
    this.players = []
    this.kills = {}
    this.killsByMeans = {}
    this.logFilePath = logFilePath

    this._processLine = this._processLine.bind(this)
    this._addGame = this._addGame.bind(this)
    this._resetVariables = this._resetVariables.bind(this)
    this.processLog = this.processLog.bind(this)
  }

  _processLine(line) {
    if (line.includes('---')) {
      return
    }

    if (line.includes('ShutdownGame')) {
      this._addGame({
        total_kills: this.totalKills,
        players: this.players,
        kills: this.kills,
        kills_by_means: this.killsByMeans,
      })

      this._resetVariables()
      return
    }

    if (line.includes('ClientUserinfoChanged')) {
      const player = line.split('n\\')[1].split('\\t')[0]

      if (!this.players.includes(player)) {
        this.players.push(player)
        this.emit('playerAdded', player)
      }
      return
    }

    if (line.includes('Kill')) {
      this.totalKills += 1

      const [part1, part2] = line.split('Kill:')[1].split('killed')
      const killer = part1.trim().split(': ')[1].trim()
      const [killed, means] = part2.trim().split('by').map((item) => item.trim())

      if (killer === '<world>') {
        this.kills[killed] = (this.kills[killed] || 0) - 1
      } else {
        this.kills[killer] = (this.kills[killer] || 0) + 1
      }

      this.killsByMeans[means.trim()] = (this.killsByMeans[means.trim()] || 0) + 1
      this.emit('killAdded', `${killer} killed ${killed} by ${means}`)
      return
    }
  }

  _addGame(game) {
    this.totalGames += 1
    const data = { [`game_${this.totalGames}`]: game }
    const gameData = JSON.stringify(data)
    this.push(gameData + '\n')
    this.emit('gameAdded', data)
  }

  _resetVariables() {
    this.totalKills = 0
    this.players = []
    this.kills = {}
    this.killsByMeans = {}
  }

  _read() {
    // We're manually pushing data, so we don't need to do anything here
  }

  processLog() {
    const logStream = fs.createReadStream(this.logFilePath)
    const rl = readline.createInterface({
      input: logStream,
      crlfDelay: Infinity
    })

    rl.on('line', this._processLine)

    rl.on('close', () => {
      this.push(null) // Signal the end of the stream
    })

    logStream.on('error', (error) => {
      this.emit('error', error)
    })

    return this // Return this so we can pipe it
  }
}
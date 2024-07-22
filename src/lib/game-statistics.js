export class GameStatistics {
  constructor() {
    this._games = []
    this.totalKills = 0
    this.players = []
    this.kills = {}
    this.killsByMeans = {}

    this.processLine = this.processLine.bind(this)
    this._addGame = this._addGame.bind(this)
    this._resetVariables = this._resetVariables.bind(this)
  }

  /**
   * @param {string} line 
   * @returns void
   */
  processLine(line) {
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
      return
    }
  }

  get games() {
    const data = {}

    this._games.forEach((game, index) => {
      const id = `game_${index + 1}`
      data[id] = game
    })

    return data
  }

  _addGame(game) {
    this._games.push(game)
  }

  _resetVariables() {
    this.totalKills = 0
    this.players = []
    this.kills = {}
    this.killsByMeans = {}
  }
}
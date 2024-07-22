import { test } from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { GameStatistics } from '../../src/lib/game-statistics.js'

const fixture = [
  {
    game_1: {
      total_kills: 0,
      players: ['Isgalamido'],
      kills: {},
      kills_by_means: {},
    },
  },
  {
    game_2: {
      total_kills: 15,
      players: ['Dono da Bola', 'Isgalamido', 'Mocinha', 'Zeh'],
      kills: { Isgalamido: -4, Zeh: -2, 'Dono da Bola': -1 },
      kills_by_means: {
        MOD_TRIGGER_HURT: 9,
        MOD_ROCKET_SPLASH: 3,
        MOD_FALLING: 2,
        MOD_ROCKET: 1,
      },
    },
  },
  {
    game_3: {
      total_kills: 105,
      players: ['Assasinu Credi', 'Dono da Bola', 'Isgalamido', 'Zeh'],
      kills: {
        Isgalamido: 19,
        'Dono da Bola': 13,
        Zeh: 20,
        'Assasinu Credi': 13,
      },
      kills_by_means: {
        MOD_TRIGGER_HURT: 9,
        MOD_FALLING: 11,
        MOD_ROCKET: 20,
        MOD_RAILGUN: 8,
        MOD_ROCKET_SPLASH: 51,
        MOD_MACHINEGUN: 4,
        MOD_SHOTGUN: 2,
      },
    },
  },
  {
    game_4: {
      total_kills: 14,
      players: ['Assasinu Credi', 'Dono da Bola', 'Isgalamido', 'Zeh'],
      kills: { Isgalamido: 2, 'Assasinu Credi': 1, Zeh: 1 },
      kills_by_means: {
        MOD_ROCKET: 4,
        MOD_ROCKET_SPLASH: 4,
        MOD_TRIGGER_HURT: 5,
        MOD_RAILGUN: 1,
      },
    },
  },
  {
    game_5: {
      total_kills: 29,
      players: [
        'Assasinu Credi',
        'Dono da Bola',
        'Fasano Agai',
        'Isgalamido',
        'Mal',
        'Maluquinho',
        'Oootsimo',
        'UnnamedPlayer',
        'Zeh',
      ],
      kills: {
        Oootsimo: 8,
        Isgalamido: 3,
        Zeh: 7,
        'Dono da Bola': 2,
        Maluquinho: 0,
        'Assasinu Credi': 1,
      },
      kills_by_means: {
        MOD_ROCKET: 5,
        MOD_RAILGUN: 2,
        MOD_SHOTGUN: 4,
        MOD_ROCKET_SPLASH: 13,
        MOD_TRIGGER_HURT: 3,
        MOD_FALLING: 1,
        MOD_MACHINEGUN: 1,
      },
    },
  },
  {
    game_6: {
      total_kills: 130,
      players: [
        'Assasinu Credi',
        'Chessus',
        'Chessus!',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'Zeh',
      ],
      kills: {
        Zeh: 9,
        'Dono da Bola': 12,
        'Assasinu Credi': 22,
        Oootsimo: 20,
        Mal: -3,
        Isgalamido: 16,
      },
      kills_by_means: {
        MOD_FALLING: 7,
        MOD_TRIGGER_HURT: 20,
        MOD_ROCKET_SPLASH: 49,
        MOD_ROCKET: 29,
        MOD_SHOTGUN: 7,
        MOD_RAILGUN: 9,
        MOD_MACHINEGUN: 9,
      },
    },
  },
  {
    game_7: {
      total_kills: 89,
      players: [
        'Assasinu Credi',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'Zeh',
      ],
      kills: {
        Oootsimo: 16,
        Isgalamido: 20,
        'Assasinu Credi': 10,
        Zeh: 12,
        'Dono da Bola': 3,
        Mal: -2,
      },
      kills_by_means: {
        MOD_TRIGGER_HURT: 9,
        MOD_ROCKET: 18,
        MOD_ROCKET_SPLASH: 39,
        MOD_FALLING: 6,
        MOD_RAILGUN: 12,
        MOD_MACHINEGUN: 4,
        MOD_SHOTGUN: 1,
      },
    },
  },
  {
    game_8: {
      total_kills: 67,
      players: [
        'Assasinu Credi',
        'Chessus',
        'Chessus!',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'Zeh',
      ],
      kills: {
        'Assasinu Credi': 10,
        Oootsimo: 9,
        Mal: 3,
        'Dono da Bola': 2,
        Zeh: 12,
        Isgalamido: 1,
        Chessus: 8,
      },
      kills_by_means: {
        MOD_TRIGGER_HURT: 8,
        MOD_ROCKET_SPLASH: 25,
        MOD_SHOTGUN: 1,
        MOD_ROCKET: 17,
        MOD_MACHINEGUN: 3,
        MOD_FALLING: 3,
        MOD_RAILGUN: 10,
      },
    },
  },
  {
    game_9: {
      total_kills: 60,
      players: [
        'Assasinu Credi',
        'Chessus',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'Zeh',
      ],
      kills: {
        Mal: 1,
        'Assasinu Credi': 3,
        'Dono da Bola': 3,
        Chessus: 5,
        Zeh: 7,
        Oootsimo: -1,
        Isgalamido: 6,
      },
      kills_by_means: {
        MOD_TELEFRAG: 25,
        MOD_TRIGGER_HURT: 17,
        MOD_ROCKET: 4,
        MOD_ROCKET_SPLASH: 1,
        MOD_RAILGUN: 7,
        MOD_BFG_SPLASH: 2,
        MOD_BFG: 2,
        MOD_MACHINEGUN: 1,
        MOD_CRUSH: 1,
      },
    },
  },
  {
    game_10: {
      total_kills: 20,
      players: [
        'Assasinu Credi',
        'Chessus',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'UnnamedPlayer',
        'Zeh',
      ],
      kills: {
        'Dono da Bola': -2,
        Isgalamido: 5,
        Oootsimo: 4,
        'Assasinu Credi': -3,
      },
      kills_by_means: {
        MOD_TRIGGER_HURT: 7,
        MOD_CRUSH: 1,
        MOD_ROCKET_SPLASH: 4,
        MOD_BFG_SPLASH: 3,
        MOD_MACHINEGUN: 1,
        MOD_RAILGUN: 4,
      },
    },
  },
  {
    game_11: {
      total_kills: 160,
      players: [
        'Assasinu Credi',
        'Chessus',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'Zeh',
      ],
      kills: {
        'Dono da Bola': 3,
        'Assasinu Credi': 20,
        Mal: -6,
        Zeh: 13,
        Chessus: 13,
        Isgalamido: 26,
        Oootsimo: 13,
      },
      kills_by_means: {
        MOD_TRIGGER_HURT: 37,
        MOD_RAILGUN: 38,
        MOD_ROCKET_SPLASH: 35,
        MOD_BFG_SPLASH: 8,
        MOD_ROCKET: 25,
        MOD_MACHINEGUN: 7,
        MOD_BFG: 8,
        MOD_FALLING: 2,
      },
    },
  },
  {
    game_12: {
      total_kills: 6,
      players: [
        'Assasinu Credi',
        'Chessus',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'Zeh',
      ],
      kills: { Isgalamido: -1, Oootsimo: 2, 'Dono da Bola': -1, Zeh: 2 },
      kills_by_means: {
        MOD_TRIGGER_HURT: 2,
        MOD_ROCKET: 1,
        MOD_ROCKET_SPLASH: 1,
        MOD_BFG_SPLASH: 1,
        MOD_BFG: 1,
      },
    },
  },
  {
    game_13: {
      total_kills: 122,
      players: [
        'Assasinu Credi',
        'Chessus',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'Zeh',
      ],
      kills: {
        Isgalamido: 22,
        Chessus: 7,
        Mal: -2,
        Oootsimo: 9,
        'Assasinu Credi': 7,
        'Dono da Bola': 2,
        Zeh: 5,
      },
      kills_by_means: {
        MOD_RAILGUN: 20,
        MOD_TRIGGER_HURT: 31,
        MOD_ROCKET: 23,
        MOD_ROCKET_SPLASH: 24,
        MOD_MACHINEGUN: 4,
        MOD_BFG_SPLASH: 10,
        MOD_FALLING: 5,
        MOD_BFG: 5,
      },
    },
  },
  {
    game_14: {
      total_kills: 3,
      players: [
        'Assasinu Credi',
        'Dono da Bola',
        'Fasano Agai',
        'Isgalamido',
        'Oootsimo',
        'Zeh',
      ],
      kills: { Zeh: -3 },
      kills_by_means: { MOD_TRIGGER_HURT: 3 },
    },
  },
  {
    game_15: {
      total_kills: 0,
      players: [
        'Assasinu Credi',
        'Dono da Bola',
        'Isgalamido',
        'Oootsimo',
        'Zeh',
      ],
      kills: {},
      kills_by_means: {},
    },
  },
  {
    game_16: {
      total_kills: 13,
      players: [
        'Assasinu Credi',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'UnnamedPlayer',
        'Zeh',
      ],
      kills: {
        'Dono da Bola': -2,
        Zeh: 0,
        'Assasinu Credi': -3,
        Oootsimo: 1,
        Isgalamido: 0,
        Mal: -1,
      },
      kills_by_means: {
        MOD_FALLING: 3,
        MOD_TRIGGER_HURT: 6,
        MOD_RAILGUN: 2,
        MOD_ROCKET_SPLASH: 2,
      },
    },
  },
  {
    game_17: {
      total_kills: 7,
      players: [
        'Assasinu Credi',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'Zeh',
      ],
      kills: {
        Zeh: 2,
        Isgalamido: 1,
        'Assasinu Credi': 2,
        'Dono da Bola': -1,
        Mal: -1,
      },
      kills_by_means: {
        MOD_ROCKET_SPLASH: 4,
        MOD_ROCKET: 1,
        MOD_FALLING: 1,
        MOD_TRIGGER_HURT: 1,
      },
    },
  },
  {
    game_18: {
      total_kills: 95,
      players: [
        'Assasinu Credi',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'Zeh',
      ],
      kills: {
        Mal: 2,
        Zeh: 20,
        Isgalamido: 14,
        Oootsimo: 10,
        'Dono da Bola': 14,
        'Assasinu Credi': 9,
      },
      kills_by_means: {
        MOD_TRIGGER_HURT: 12,
        MOD_ROCKET: 27,
        MOD_ROCKET_SPLASH: 32,
        MOD_SHOTGUN: 6,
        MOD_RAILGUN: 10,
        MOD_MACHINEGUN: 7,
        MOD_FALLING: 1,
      },
    },
  },
  {
    game_19: {
      total_kills: 3,
      players: [
        'Assasinu Credi',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'Zeh',
      ],
      kills: { 'Dono da Bola': 2, Oootsimo: 1 },
      kills_by_means: { MOD_ROCKET_SPLASH: 2, MOD_ROCKET: 1 },
    },
  },
  {
    game_20: {
      total_kills: 131,
      players: [
        'Assasinu Credi',
        'Dono da Bola',
        'Isgalamido',
        'Mal',
        'Oootsimo',
        'Zeh',
      ],
      kills: {
        'Dono da Bola': 14,
        Zeh: 19,
        Mal: 6,
        Isgalamido: 17,
        'Assasinu Credi': 19,
        Oootsimo: 22,
      },
      kills_by_means: {
        MOD_ROCKET: 37,
        MOD_TRIGGER_HURT: 14,
        MOD_RAILGUN: 9,
        MOD_ROCKET_SPLASH: 60,
        MOD_MACHINEGUN: 4,
        MOD_SHOTGUN: 4,
        MOD_FALLING: 3,
      },
    },
  },
]

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathToLogFile = path.join(__dirname, '..', '..', 'src', 'database', 'qgames.txt')

function processLogAndCollectResults(gameStats) {
  return new Promise((resolve, reject) => {
    const results = []
    gameStats.processLog()
      .on('data', (chunk) => {
        results.push(JSON.parse(chunk))
      })
      .on('end', () => {
        resolve(results)
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

test('return game statistics from logfile', async () => {
  const gameStats = new GameStatistics(pathToLogFile)
  const games = await processLogAndCollectResults(gameStats)

  assert.deepEqual(games, fixture)
})

test('sum of kills on kill by means', async () => {
  const gameStats = new GameStatistics(pathToLogFile)
  const games = await processLogAndCollectResults(gameStats)

  const totalKillsByMeans = games.reduce((acc, game) => {
    const { kills_by_means, total_kills } = Object.values(game)[0]
    const sum = Object.values(kills_by_means).reduce((acc, value) => acc + value, 0)
    return acc + sum - total_kills
  }, 0)

  assert.equal(totalKillsByMeans, 0)
})
import readline from 'node:readline'
import fs from 'node:fs'

const log = fs.createReadStream('./src/database/qgames.txt')

const rl = readline.createInterface({
  input: log,
  crlfDelay: Infinity,
})

// Process each line
rl.on('line', async (line) => {
  console.log(line)
})

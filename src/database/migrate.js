import { db } from './client.js'
import fs from 'node:fs'

const migrations = fs.readdirSync('./src/database/migrations')

export async function migrate() {
  console.log('Running migrations...')

  for (const migration of migrations) {
    console.log(`Running migration: ${migration}`)

    const sql = fs.readFileSync(`./src/database/migrations/${migration}`, 'utf-8')
    await db.exec(sql)
  }
}

migrate()

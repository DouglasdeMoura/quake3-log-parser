import Database from 'better-sqlite3'

const db = new Database(process.env.DATABASE_URL)

db.pragma('journal_mode = WAL')
db.pragma('synchronous = NORMAL')
db.pragma('journal_size_limit = 67108864')
db.pragma('mmap_size = 134217728')
db.pragma('cache_size = 2000')
db.pragma('busy_timeout = 5000')

export { db }
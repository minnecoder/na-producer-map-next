import { MongoClient, Db, MongoClientOptions } from 'mongodb'

let uri: string | undefined = process.env.MONGODB_URI
let dbName = process.env.MONGODB_DB

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

if (typeof uri === 'undefined') {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}
if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const options: MongoClientOptions = {
    retryWrites: true,
    tls: true,
  }

  const client: MongoClient = await MongoClient.connect(uri ?? '', options)

  const db: Db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

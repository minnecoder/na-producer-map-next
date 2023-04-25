import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/utils/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase()
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const users = await db.collection('users').find().toArray()
        return res.status(200).json({
          count: users.length,
          data: users,
        })
      } catch (error) {
        return res.status(500).json(error)
      }

    case 'POST':
      try {
        const user = await db.collection('users').insertOne({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          lat: req.body.lat,
          long: req.body.long,
        })
        return res.status(201).json(user)
      } catch (error) {
        return res.status(400).json({ error: 'Server Error' })
      }

    default:
      return res.status(400).json({ success: false })
  }
}

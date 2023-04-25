import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/utils/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase()
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const user = await db.collection('users').findOne({ id })
        return res.status(200).json(user)
      } catch (error) {
        return res.status(400).json({ error: 'Server Error' })
      }

    case 'PUT':
      try {
        const user = await db.collection('users').findOne({ id })
        user?.set(req.body)
        await user?.save()
        return res.status(200).json(user)
      } catch (error) {
        return res.status(500).json({ error: 'Server Error' })
      }

    case 'DELETE':
      try {
        const user = await db.collection('users').findOne({ id })

        if (!user) {
          return res.status(404).json({
            success: false,
            error: 'No user found',
          })
        }
        await user?.remove()

        return res.status(200).json({
          success: true,
        })
      } catch (error) {
        return res.status(500).json({ error: 'Server Error' })
      }

    default:
      return res.status(400).json({ error: 'Unexpected Error' })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
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
        // Check if password fields have data

        if (
          req.body.password !== '' &&
          req.body.newPassword !== '' &&
          req.body.confirmNewPassword !== ''
        ) {
          // Get the users data
          const user = await db
            .collection('users')
            .findOne({ email: req.body.email })

          // Verify that password is the same as what's in the db
          const isValid = bcrypt.compareSync(
            req.body.currentPassword,
            user.password
          )
          if (!isValid) {
            return res.status(400).json({
              error: 'There is an issue with the current password',
            })
          }

          // Hash new password
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)

          try {
            await db.collection('users').updateOne(
              {
                email: req.body.email,
              },
              {
                $set: {
                  password: hashedPassword,
                },
              }
            )

            return res.status(200).json({ success: true })
          } catch (error) {
            return res.status(400).json({ error: 'Updating password failed' })
          }
        }

        const user = await db.collection('users').updateOne(
          { email: req.body.email },
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              lat: req.body.lat,
              long: req.body.long,
            },
          }
        )
        return res.status(201).json(user)
      } catch (error) {
        return res.status(400).json({ error: 'Updating user failed' })
      }

    default:
      return res.status(400).json({ error: 'Server Error' })
  }
}

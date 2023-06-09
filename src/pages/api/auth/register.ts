import type { NextApiRequest, NextApiResponse } from 'next/types'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase()
  const user = await db.collection('users').findOne({ email: req.body.email })

  if (user) {
    return res.status(400).json({ error: 'Email already exists' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  function replaceSpacesWithDashes(input: string): string {
    let result = ''
    for (let i = 0; i < input.length; i += 1) {
      if (input[i] === ' ') {
        result += '-'
      } else {
        result += input[i]
      }
    }
    return result
  }

  const linkText = replaceSpacesWithDashes(req.body.name)

  const createUser = await db.collection('users').insertOne({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: 'user',
    linkText,
    lat: req.body.lat,
    long: req.body.long,
  })

  return res.status(200).json({ success: true, data: createUser })
}

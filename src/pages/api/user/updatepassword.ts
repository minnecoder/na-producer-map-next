import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/utils/mongodb'
import bcrypt from 'bcryptjs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase()
  const user = await db.collection('users').findOne({ email: req.body.email })

  // TODO: Verify that update password works
  // TODO: Verify that after a successful password update that confirmpassword and confirmnewpassword are not added to the users db entry

  // Compare password from db and from the body
  const isValidPassword = await bcrypt.compare(
    user.password,
    req.body.newPassword
  )
  if (!isValidPassword) {
    // TODO: Figure out a better way to say this before going into prod
    return res.status(400).json({
      error: 'The current password is not the same as the one in the db',
    })
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)

  // Update password to new password
  const updatedUser = await db
    .collection('users')
    .updateOne(
      { email: req.body.email },
      { $set: { password: hashedPassword } }
    )

  if (!updatedUser) {
    return res.status(400).json({ message: 'Something went wrong' })
  }
  console.log(`${updatedUser.modifiedCount} document(s) updated`)
  return res.status(200).json({ message: 'Password updated' })
}

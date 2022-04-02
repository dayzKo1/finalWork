import { resolver, SecurePassword, AuthenticationError } from "blitz"
import db from "db"
import { Login } from "../validations"

export const authenticateUser = async (rawEmail, rawPassword) => {
  const { email, password } = Login.parse({
    email: rawEmail,
    password: rawPassword,
  })
  const user = await db.user.findFirst({
    where: {
      email,
    },
  })
  if (!user) throw new AuthenticationError()
  // 登录次数+1
  const record = await db.record.findFirst({
    where: {
      userId: user.id,
    },
  })
  if (!record) {
    await db.record.create({
      data: {
        userId: user.id,
        times: 1,
      },
    })
  } else {
    await db.record.update({
      where: {
        id: record.id,
      },
      data: {
        times: { increment: 1 },
      },
    })
  }

  const result = await SecurePassword.verify(user.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashedPassword: improvedHash,
      },
    })
  }

  const { hashedPassword, ...rest } = user
  return rest
}
export default resolver.pipe(resolver.zod(Login), async ({ email, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password)
  await ctx.session.$create({
    userId: user.id,
    role: user.role,
  })
  return user
})

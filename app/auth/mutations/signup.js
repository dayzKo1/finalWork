import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, password, role, name, companyIntro, companyKind, companySize }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        hashedPassword,
        role,
        name,
        companyIntro,
        companyKind,
        companySize,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companyIntro: true,
        companyKind: true,
        companySize: true,
      },
    })
    await db.record.create({
      data: {
        userId: user.id,
        times: 1,
      },
    })
    await ctx.session.$create({
      userId: user.id,
      role: user.role,
    })
    return user
  }
)

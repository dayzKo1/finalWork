import { SecurePassword, resolver } from "blitz"
import db from "db"
import { editUser } from "../validations"

export default resolver.pipe(
  // resolver.zod(editUser),
  resolver.authorize(),
  async ({ id, email, name, role, password, companyKind, companySize }, ctx) => {
    let hashedPassword = ""
    if (password) {
      hashedPassword = await SecurePassword.hash(password.trim())
    }
    const user = await db.user.findFirst({
      where: {
        id: id,
      },
    })
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        role,
        email: email.toLowerCase().trim(),
        name,
        companyKind,
        companySize,
        hashedPassword: hashedPassword === "" ? user.hashedPassword : hashedPassword,
      },
    })
    return true
  }
)

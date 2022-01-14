import { resolver } from "blitz"
import db from "db"
import { editUser } from "../validations"

export default resolver.pipe(
  resolver.zod(editUser),
  resolver.authorize(),
  async ({ email, name }, ctx) => {
    const user = await db.user.findFirst({
      where: {
        id: ctx.session.userId,
      },
    })
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: email.toLowerCase().trim(),
        name,
      },
    })
    return true
  }
)

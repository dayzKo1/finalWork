import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteCollect = z.object({
  userId: z.number(),
  recruitId: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeleteCollect),
  resolver.authorize(),
  async ({ userId, recruitId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const collect = await db.collect.deleteMany({
      where: {
        userId,
        recruitId,
      },
    })
    return collect
  }
)

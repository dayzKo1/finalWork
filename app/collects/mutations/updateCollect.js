import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateCollect = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateCollect),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const collect = await db.collect.update({
      where: {
        id,
      },
      data,
    })
    return collect
  }
)

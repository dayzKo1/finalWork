import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateRecruit = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateRecruit),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const recruit = await db.recruit.update({
      where: {
        id,
      },
      data,
    })
    return recruit
  }
)

import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateApply = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateApply),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const apply = await db.apply.update({
      where: {
        id,
      },
      data,
    })
    return apply
  }
)

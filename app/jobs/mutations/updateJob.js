import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateJob = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateJob),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const job = await db.job.update({
      where: {
        id,
      },
      data,
    })
    return job
  }
)

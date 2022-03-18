import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateRecruit = z.object({
  id: z.number(),
  name: z.string(),
  salaryMax: z.string(),
  salaryMin: z.string(),
  description: z.string(),
  detail: z.string(),
  city: z.string(),
  year: z.string(),
  educ: z.string(),
  type: z.string(),
  avai: z.string(),
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

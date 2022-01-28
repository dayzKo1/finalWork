import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteRecruit = z.object({
  id: z.number(),
})
export default resolver.pipe(resolver.zod(DeleteRecruit), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const recruit = await db.recruit.deleteMany({
    where: {
      id,
    },
  })
  return recruit
})

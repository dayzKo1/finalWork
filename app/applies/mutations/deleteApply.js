import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteApply = z.object({
  id: z.number(),
})
export default resolver.pipe(resolver.zod(DeleteApply), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const apply = await db.apply.deleteMany({
    where: {
      id,
    },
  })
  return apply
})

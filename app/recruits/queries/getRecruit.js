import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetRecruit = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetRecruit), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const recruit = await db.recruit.findFirst({
    where: {
      id,
    },
  })
  if (!recruit) throw new NotFoundError()
  return recruit
})

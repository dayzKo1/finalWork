import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetApply = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetApply), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const apply = await db.apply.findFirst({
    where: {
      id,
    },
  })
  if (!apply) throw new NotFoundError()
  return apply
})

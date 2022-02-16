import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetCollect = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetCollect), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const collect = await db.collect.findFirst({
    where: {
      id,
    },
  })
  if (!collect) throw new NotFoundError()
  return collect
})

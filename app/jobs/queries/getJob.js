import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetJob = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetJob), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const job = await db.job.findFirst({
    where: {
      id,
    },
  })
  if (!job) throw new NotFoundError()
  return job
})

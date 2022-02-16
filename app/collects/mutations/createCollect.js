import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateCollect = z.object({
  userId: z.number(),
  recruitId: z.number(),
})
export default resolver.pipe(resolver.zod(CreateCollect), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const collect = await db.collect.create({
    data: {
      ...input,
      userId: input.userId,
      recruitId: input.recruitId,
    },
  })
  return collect
})

import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateRecruit = z.object({
  name: z.string(),
  salary: z.string(),
  description: z.string(),
  detail: z.string(),
  userId: z.number(),
})
export default resolver.pipe(resolver.zod(CreateRecruit), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const recruit = await db.recruit.create({
    data: {
      ...input,
      name: input.name,
      salary: input.salary,
      description: input.description,
      detail: input.detail,
      userId: input.userId,
    },
  })
  return recruit
})

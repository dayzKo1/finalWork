import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateRecruit = z.object({
  name: z.string(),
  choices: z.array(z.object({ text: z.string() })),
})
export default resolver.pipe(resolver.zod(CreateRecruit), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const recruit = await db.recruit.create({
    data: input,
  })
  return recruit
})

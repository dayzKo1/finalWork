import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetResume = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetResume), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const resume = await db.resume.findFirst({
    where: { id },
    include: {
      educExp: true,
      inteExp: true,
      projExp: true,
      studExp: true,
      language: true,
      skills: true,
      certificate: true,
    },
  })

  if (!resume) throw new NotFoundError()

  return resume
})

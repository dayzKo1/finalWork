import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateResume = z.object({
  gender: z.string(), // 性别
  age: z.string(), // 年龄
  status: z.string(), // 求职状态
  prefer: z.string(), // 求职意向
  advance: z.string(), // 个人优势
  works: z.string(), // 个人作品
  educExp: z.array(z.object({ content: z.string() })), // 教育经历
  inteExp: z.array(z.object({ content: z.string() })), // 工作/实习经历
  projExp: z.array(z.object({ content: z.string() })), // 项目经历
  studExp: z.array(z.object({ content: z.string() })), // 学生干部经历
  language: z.array(z.object({ content: z.string() })), // 语言能力
  skills: z.array(z.object({ content: z.string() })), // 专业技能
  certificate: z.array(z.object({ content: z.string() })), // 证书
})

export default resolver.pipe(resolver.zod(CreateResume), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const resume = await db.resume.create({
    data: {
      ...input,
      educExp: { create: input.educExp },
      inteExp: { create: input.inteExp },
      projExp: { create: input.projExp },
      studExp: { create: input.studExp },
      language: { create: input.language },
      skills: { create: input.skills },
      certificate: { create: input.certificate },
    },
  })
  return resume
})

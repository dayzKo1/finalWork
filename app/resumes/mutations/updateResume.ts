import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateResume = z.object({
  gender: z.string(), // 性别
  age: z.string(), // 年龄
  status: z.string(), // 求职状态
  prefer: z.string(), // 求职意向
  advance: z.string(), // 个人优势
  works: z.string(), // 个人作品
  educExp: z.array(z.object({ id: z.number().optional(), content: z.string() })), // 教育经历
  inteExp: z.array(z.object({ id: z.number().optional(), content: z.string() })), // 工作/实习经历
  projExp: z.array(z.object({ id: z.number().optional(), content: z.string() })), // 项目经历
  studExp: z.array(z.object({ id: z.number().optional(), content: z.string() })), // 学生干部经历
  language: z.array(z.object({ id: z.number().optional(), content: z.string() })), // 语言能力
  skills: z.array(z.object({ id: z.number().optional(), content: z.string() })), // 专业技能
  certificate: z.array(z.object({ id: z.number().optional(), content: z.string() })), // 证书
})

export default resolver.pipe(
  resolver.zod(UpdateResume),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const resume = await db.resume.update({
      where: { id },

      data: {
        ...data,

        educExp: {
          upsert: data.educExp.map((item) => ({
            where: { id: item.id || 0 },
            create: { content: item.content },
            update: { content: item.content },
          })),
        },

        inteExp: {
          upsert: data.inteExp.map((item) => ({
            where: { id: item.id || 0 },
            create: { content: item.content },
            update: { content: item.content },
          })),
        },

        projExp: {
          upsert: data.projExp.map((item) => ({
            where: { id: item.id || 0 },
            create: { content: item.content },
            update: { content: item.content },
          })),
        },

        studExp: {
          upsert: data.studExp.map((item) => ({
            where: { id: item.id || 0 },
            create: { content: item.content },
            update: { content: item.content },
          })),
        },

        language: {
          upsert: data.language.map((item) => ({
            where: { id: item.id || 0 },
            create: { content: item.content },
            update: { content: item.content },
          })),
        },

        skills: {
          upsert: data.skills.map((item) => ({
            where: { id: item.id || 0 },
            create: { content: item.content },
            update: { content: item.content },
          })),
        },

        certificate: {
          upsert: data.certificate.map((item) => ({
            where: { id: item.id || 0 },
            create: { content: item.content },
            update: { content: item.content },
          })),
        },
      },
    })

    return resume
  }
)

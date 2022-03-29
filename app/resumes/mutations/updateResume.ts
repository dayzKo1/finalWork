import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateResume = z.object({
  id: z.number(),
  gender: z.string(), // 性别
  age: z.string(), // 年龄
  status: z.string(), // 求职状态
  prefer: z.string(), // 求职意向
  advance: z.string(), // 个人优势/作品
  educ: z.string(), // 教育经历
  inte: z.string(), // 工作/实习经历
  proj: z.string(), // 项目经历
  stud: z.string(), // 学生干部经历
  lang: z.string(), // 语言能力
  skil: z.string(), // 专业技能
  cert: z.string(), // 证书
  number: z.string(), // 电话
})

export default resolver.pipe(
  resolver.zod(UpdateResume),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const resume = await db.resume.update({
      where: {
        id,
      },
      data,
      // data: {
      //   ...data,

      //   educExp: {
      //     upsert: data.educExp.map((item) => ({
      //       where: { id: item.id || 0 },
      //       create: { content: item.content },
      //       update: { content: item.content },
      //     })),
      //   },

      //   inteExp: {
      //     upsert: data.inteExp.map((item) => ({
      //       where: { id: item.id || 0 },
      //       create: { content: item.content },
      //       update: { content: item.content },
      //     })),
      //   },

      //   projExp: {
      //     upsert: data.projExp.map((item) => ({
      //       where: { id: item.id || 0 },
      //       create: { content: item.content },
      //       update: { content: item.content },
      //     })),
      //   },

      //   studExp: {
      //     upsert: data.studExp.map((item) => ({
      //       where: { id: item.id || 0 },
      //       create: { content: item.content },
      //       update: { content: item.content },
      //     })),
      //   },

      //   language: {
      //     upsert: data.language.map((item) => ({
      //       where: { id: item.id || 0 },
      //       create: { content: item.content },
      //       update: { content: item.content },
      //     })),
      //   },

      //   skills: {
      //     upsert: data.skills.map((item) => ({
      //       where: { id: item.id || 0 },
      //       create: { content: item.content },
      //       update: { content: item.content },
      //     })),
      //   },

      //   certificate: {
      //     upsert: data.certificate.map((item) => ({
      //       where: { id: item.id || 0 },
      //       create: { content: item.content },
      //       update: { content: item.content },
      //     })),
      //   },
      // },
    })

    return resume
  }
)

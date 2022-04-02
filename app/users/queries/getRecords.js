import { paginate, resolver } from "blitz"
import db from "db"
export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: records,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.record.count({
          where,
        }),
      query: (paginateArgs) =>
        db.record.findMany({ ...paginateArgs, where, orderBy, include: { user: true } }),
    })
    return {
      records,
      nextPage,
      hasMore,
      count,
    }
  }
)

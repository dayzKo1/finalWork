import { paginate, resolver } from "blitz"
import db from "db"
export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: applies,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.apply.count({
          where,
        }),
      query: (paginateArgs) =>
        db.apply.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            user: true,
            recruit: true,
          },
        }),
    })
    return {
      applies,
      nextPage,
      hasMore,
      count,
    }
  }
)

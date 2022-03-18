import { paginate, resolver } from "blitz"
import db from "db"
export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: collects,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.collect.count({
          where,
        }),
      query: (paginateArgs) => db.collect.findMany({ ...paginateArgs, where, orderBy }),
    })
    return {
      collects,
      nextPage,
      hasMore,
      count,
    }
  }
)

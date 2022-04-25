import { paginate, resolver } from "blitz"
import db from "db"
export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }) => {
    const {
      items: users,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.user.count({
          where,
        }),
      query: (paginateArgs) => db.user.findMany({ ...paginateArgs, where, orderBy }),
    })
    return {
      users,
      nextPage,
      hasMore,
      count,
    }
  }
)

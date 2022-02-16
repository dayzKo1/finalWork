import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecruits from "app/recruits/queries/getRecruits"
import { Button, Card, Tag } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getApplies from "app/applies/queries/getApplies"

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />
const ITEMS_PER_PAGE = 100
export const AppliesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ applies, hasMore }] = usePaginatedQuery(getApplies, {
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    })

  return (
    <div>
      <Card title="申请信息" style={{ marginTop: 10 }}>
        {applies.map((apply) => (
          <Card
            key={apply.id}
            style={{ width: 800 }}
            type="inner"
            title={apply.recruitId}
            extra={
              <>
                <Link
                  href={Routes.ShowRecruitPage({
                    recruitId: apply.id,
                  })}
                >
                  <a>查看简历</a>
                </Link>
              </>
            }
          ></Card>
        ))}
      </Card>

      {/* <div>
        <button disabled={page === 0} onClick={goToPreviousPage}>
          上一页
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          下一页
        </button>
      </div> */}
    </div>
  )
}

const AppliesPage = () => {
  const currentUser = useCurrentUser()
  return (
    <>
      <Head>
        <title>Recruits</title>
      </Head>

      <div>
        <Suspense fallback={antIcon}>
          <AppliesList />
        </Suspense>
      </div>
    </>
  )
}

AppliesPage.authenticate = true

AppliesPage.getLayout = (page) => <Layout>{page}</Layout>

export default AppliesPage

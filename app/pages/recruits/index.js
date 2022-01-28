import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecruits from "app/recruits/queries/getRecruits"
import { Button, Card, Tag } from "antd"
const ITEMS_PER_PAGE = 100
export const RecruitsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ recruits, hasMore }] = usePaginatedQuery(getRecruits, {
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
      <Card title="招聘信息">
        {recruits.map((recruit) => (
          <Card
            key={recruit.id}
            style={{ marginTop: 16, width: 800 }}
            type="inner"
            title={recruit.name}
            extra={
              <Link
                href={Routes.ShowRecruitPage({
                  recruitId: recruit.id,
                })}
              >
                <a>详情</a>
              </Link>
            }
          >
            {/* {recruit.tags.map((v) => <Tag key={recruit.id}>{v}</Tag>)} */}
          </Card>
        ))}
      </Card>

      <div>
        <button disabled={page === 0} onClick={goToPreviousPage}>
          上一页
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          下一页
        </button>
      </div>
    </div>
  )
}

const RecruitsPage = () => {
  return (
    <>
      <Head>
        <title>Recruits</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewRecruitPage()}>
            <a>发布招聘信息</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RecruitsList />
        </Suspense>
      </div>
    </>
  )
}

RecruitsPage.authenticate = true

RecruitsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RecruitsPage

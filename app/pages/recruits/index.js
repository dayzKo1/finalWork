import { Suspense, useState } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, Image } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecruits from "app/recruits/queries/getRecruits"
import { Button, Card, Tag } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const ITEMS_PER_PAGE = 4
export const RecruitsList = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const page = Number(router.query.page) || 0
  const [{ recruits, hasMore, count }] = usePaginatedQuery(getRecruits, {
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

  const [activeTabKey, setactiveTabKey] = useState("default")
  const onTabChange = (key) => {
    setactiveTabKey(key)
  }
  const tabList = [
    {
      key: "default",
      tab: "默认排序",
    },
    {
      key: "salary",
      tab: "薪酬最高",
    },
    {
      key: "createdAt",
      tab: "最新发布",
    },
  ]

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Card
          style={{ width: 800, margin: 10, background: "none", border: "none" }}
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={(key) => {
            onTabChange(key)
          }}
        >
          {recruits.map((recruit) => (
            <Card
              key={recruit.id}
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
              <div style={{ display: "flex", justifyContent: "space-between", padding: 24 }}>
                <div>
                  <div>
                    {recruit.salary} | {recruit.description}
                  </div>
                  <div>{recruit.user.name}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    // onClick={async () => {
                    //   await createApplication({
                    //     userId: currentUser.id,
                    //     recruitId: recruit.id,
                    //   })
                    //   message.success('申请成功')
                    //   setApplied(true)
                    // }}
                    // disabled={isApplied}
                  >
                    {/* {isApplied ? '已申请' : '申请'} */}申请
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </Card>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: 10,
          }}
        >
          <div style={{ marginRight: 10, marginTop: 5 }}>{`第 ${page + 1} 页 共 ${count} 项`}</div>
          <Button disabled={page === 0} onClick={goToPreviousPage} style={{ marginRight: 10 }}>
            上一页
          </Button>
          <Button disabled={!hasMore} onClick={goToNextPage} style={{ marginRight: 10 }}>
            下一页
          </Button>
          {currentUser.role === "COMPANY" && (
            <Button type="primary">
              <Link href={Routes.NewRecruitPage()}>发布招聘信息</Link>
            </Button>
          )}
        </div>
      </div>
      <div style={{ marginTop: 68 }}>
        <Card
          hoverable
          style={{ width: 244, margin: 10, height: 138, borderRadius: 6 }}
          cover={<Image layout="fill" alt="" src="/backgroudImage1.png" />}
        ></Card>
        <Card
          hoverable
          style={{ width: 244, margin: 10, height: 138, borderRadius: 6 }}
          cover={<Image layout="fill" alt="" src="/backgroudImage2.png" />}
        ></Card>
      </div>
      <style jsx>
        {`
        :global(.ant-card-body) {
          padding:0 !important;
        }

        :global(.ant-tabs>.ant-tabs-nav .ant-tabs-nav-wrap) {
          margin-bottom:10px;
        }

        :global(.ant-tabs-tab:hover ) {
          color:white;
        }

        :global( .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn ) {
          color:white;
        }

        :global(.ant-card-head){
          border-bottom:none;
        }

        :global(.ant-card-bordered){
          border:none;
        }

        :global(.ant-card){
          border-radius:0;
        }
 */}
         `}
      </style>
    </div>
  )
}

const RecruitsPage = () => {
  return (
    <>
      <Head>
        <title>Recruits</title>
      </Head>
      <Suspense fallback={antIcon}>
        <RecruitsList />
      </Suspense>
    </>
  )
}

RecruitsPage.authenticate = true

RecruitsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RecruitsPage

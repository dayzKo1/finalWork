import { Suspense, useState, useReducer } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, Image, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecruits from "app/recruits/queries/getRecruits"
import { Button, Card, Tag, message, Input, Empty } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createApply from "app/applies/mutations/createApply"
import getApplies from "app/applies/queries/getApplies"
import { Router } from "next/dist/client/router"
import createCollect from "app/collects/mutations/createCollect"
import getCollects from "app/collects/queries/getCollects"
import deleteCollect from "app/collects/mutations/deleteCollect"
import { FixedSizeList as List } from "react-window"

const { Search } = Input
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />

export const CollectsList = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const [Applied, setApplied] = useState(false)
  const [Collected, setCollected] = useState(false)
  const [{ collects }] = usePaginatedQuery(getCollects, {
    orderBy: {
      id: "asc",
    },
    skip: 0,
    take: 100,
    Collected,
  })
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState("")
  const [{ recruits, count }] = usePaginatedQuery(getRecruits, {
    orderBy: {
      id: "asc",
    },
  })
  const [recruitData, setRecruData] = useState(recruits)
  const [{ applies }] = usePaginatedQuery(getApplies, {
    orderBy: {
      id: "asc",
    },
    skip: 0,
    take: 100,
    Applied,
  })

  const [createApplication] = useMutation(createApply)

  const number = (a) => {
    let b = parseFloat(a)
    if (a.indexOf("千") + 1) {
      return b * 1000
    }
    if (a.indexOf("万") + 1) {
      return b * 10000
    }
  }

  const date = (a) => {
    return Date.parse(a)
  }

  const [activeTabKey, setactiveTabKey] = useState("default")
  const onTabChange = (key) => {
    switch (key) {
      case "default":
        recruitData.sort((m, n) => {
          return m.id - n.id
        })
        break
      case "createdAt":
        recruitData.sort((m, n) => {
          return date(n.createdAt) - date(m.createdAt)
        })
        break
      case "salary":
        recruitData.sort((m, n) => {
          return number(n.salaryMax) - number(m.salaryMax)
        })
        break
      case "updatedAt":
        recruitData.sort((m, n) => {
          return date(n.updatedAt) - date(m.updatedAt)
        })
        break
    }
    setactiveTabKey(key)
  }
  const tabList = [
    {
      key: "default",
      tab: "默认排序",
    },
    {
      key: "createdAt",
      tab: "最新发布",
    },
    {
      key: "salary",
      tab: "薪酬最高",
    },
    {
      key: "updatedAt",
      tab: "最近活跃",
    },
  ]
  const onSearch = (value) => {
    setRecruData(
      recruits.filter((item, index, arr) => {
        return item.name.indexOf(value) + 1 || item.user.name.indexOf(value) + 1
      })
    )
    onTabChange(activeTabKey)
    setSearch(value)
  }

  const status = (arr, m, n) => {
    return arr.some((item, index, arr) => {
      return item?.userId === m?.id && item?.recruitId === n?.id
    })
  }

  const Row = ({ index, style }) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      <Card
        style={{ height: 150 }}
        key={recruitData[index]?.id}
        type="inner"
        title={recruitData[index]?.name}
        extra={
          <Link
            href={Routes.ShowRecruitPage({
              recruitId: recruitData[index]?.id,
            })}
          >
            <a>详情</a>
          </Link>
        }
      >
        <div style={{ display: "flex", justifyContent: "space-between", padding: 24 }}>
          <div>
            <div>
              {recruitData[index]?.salaryMin}-{recruitData[index]?.salaryMax} |{" "}
              {recruitData[index]?.description}
            </div>
            <div>{recruitData[index]?.user?.name}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {currentUser.role === "USER" && (
              <>
                <Button
                  style={{ marginRight: 10, width: 64, padding: 2 }}
                  type="primary"
                  onClick={async () => {
                    await createApplication({
                      userId: currentUser?.id,
                      recruitId: recruitData[index]?.id,
                    })
                    setApplied(!Applied)
                    message.success("申请成功")
                  }}
                  disabled={status(applies, currentUser, recruitData[index])}
                >
                  {status(applies, currentUser, recruitData[index]) ? "已申请" : "申请"}
                </Button>
                <Button
                  style={{ width: 64, padding: 2 }}
                  type="primary"
                  danger={status(collects, currentUser, recruitData[index])}
                  onClick={async () => {
                    if (!status(collects, currentUser, recruitData[index])) {
                      await createCollect({
                        userId: currentUser?.id,
                        recruitId: recruitData[index]?.id,
                      })
                      message.success("收藏成功")
                      setCollected(!Collected)
                    } else {
                      await deleteCollect({
                        userId: currentUser?.id,
                        recruitId: recruitData[index]?.id,
                      })
                      message.success("取消收藏成功")
                      setCollected(!Collected)
                    }
                  }}
                >
                  {status(collects, currentUser, recruitData[index]) ? "收藏√" : "收藏"}
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )

  return (
    <>
      <div>
        <Search
          placeholder="搜索职位、公司"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={(e) => onSearch(e)}
          style={{ width: 1065, margin: 20 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid white",
          width: 1065,
        }}
      >
        <div>
          <Card
            style={{
              width: 800,
              marginRight: 10,
              background: "none",
              border: "none",
            }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={(key) => {
              onTabChange(key)
            }}
          ></Card>

          <List
            className="List"
            height={600}
            itemCount={recruitData.length}
            itemSize={150}
            width={800}
          >
            {Row}
          </List>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <div
              style={{ marginRight: 10, marginTop: 5, color: "white" }}
            >{`共 ${recruitData.length} 项`}</div>
            {currentUser.role === "COMPANY" && (
              <Button type="primary">
                <Link href={Routes.NewRecruitPage()}>发布招聘信息</Link>
              </Button>
            )}
          </div>
        </div>
        <div style={{ marginTop: 55 }}>
          <Card
            hoverable
            style={{ width: 244, margin: "10px 10px 0px 10px", height: 138, borderRadius: 6 }}
            cover={<Image layout="fill" alt="" src="/backgroudImage1.png" />}
          ></Card>
          <Card
            hoverable
            style={{ width: 244, margin: "10px 10px 10px 10px", height: 138, borderRadius: 6 }}
            cover={<Image layout="fill" alt="" src="/backgroudImage2.png" />}
          ></Card>
        </div>
        <style jsx>
          {`
            :global(.ant-card-body) {
              padding: 0 !important;
            }

            :global(.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap) {
              margin-bottom: 10px;
            }

            :global(.ant-tabs-tab:hover) {
              color: white;
            }

            :global(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
              color: white;
            }

            :global(.ant-card-head) {
              border-bottom: none;
            }

            :global(.ant-card-bordered) {
              border: none;
            }

            :global(.ant-card) {
              border-radius: 0;
            }
          `}
        </style>
      </div>
    </>
  )
}

const CollectsPage = () => {
  return (
    <>
      <Head>
        <title>Recruits</title>
      </Head>
      <Suspense fallback={antIcon}>
        <CollectsList />
      </Suspense>
    </>
  )
}

CollectsPage.authenticate = true

CollectsPage.getLayout = (page) => <Layout>{page}</Layout>

export default CollectsPage

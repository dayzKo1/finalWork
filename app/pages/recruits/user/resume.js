import { Suspense, useState, useReducer } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, Image, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecruits from "app/recruits/queries/getRecruits"
import { Button, Card, Tag, message, Input, Empty, Divider } from "antd"
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

export const AppliesList = () => {
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
  const [{ applies }] = usePaginatedQuery(getApplies, {
    orderBy: {
      id: "asc",
    },
    skip: 0,
    take: 100,
    Applied,
  })

  const status = (arr, m, n) => {
    return arr.some((item, index, arr) => {
      return item?.userId === m?.id && item?.recruitId === n?.id
    })
  }

  const [recruitData, setRecruData] = useState(
    recruits.filter((item, index) => {
      return status(applies, currentUser, recruits[index])
    })
  )

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
              {recruitData[index]?.salaryMin}-{recruitData[index]?.salaryMax}
              <Divider type="vertical" />
              {recruitData[index]?.city} <Divider type="vertical" />
              {recruitData[index]?.year} <Divider type="vertical" />
              {recruitData[index]?.educ} <Divider type="vertical" />招{recruitData[index]?.avai}
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
      <h2 style={{ color: "wheat", marginTop: 15, textAlign: "center" }}>我的申请</h2>
      <div
        style={{
          display: "flex",
          marginTop: 20,
          width: 1065,
        }}
      >
        <div>
          {recruitData.length > 0 ? (
            <List
              className="List"
              height={600}
              itemCount={recruitData.length}
              itemSize={150}
              width={800}
            >
              {Row}
            </List>
          ) : (
            <Empty
              style={{ height: 600, width: 800, background: "white", padding: 50, margin: 0 }}
              description="暂无数据"
            />
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <div style={{ marginRight: 10, marginTop: 5, color: "white" }}>{`共 ${
              recruitData.length ?? 0
            } 项`}</div>
            {currentUser.role === "COMPANY" && (
              <Button type="primary">
                <Link href={Routes.NewRecruitPage()}>发布招聘信息</Link>
              </Button>
            )}
          </div>
        </div>
        <div style={{ marginTop: -10 }}>
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

const ResumePage = () => {
  const currentUser = useCurrentUser()
  return (
    <>
      <Head>
        <title>我的申请</title>
      </Head>

      <div>
        <Suspense fallback={antIcon}>
          <AppliesList />
        </Suspense>
      </div>
    </>
  )
}

ResumePage.authenticate = true

ResumePage.getLayout = (page) => <Layout>{page}</Layout>

export default ResumePage

import { Suspense, useState } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useParam,
  useMutation,
  Routes,
  usePaginatedQuery,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecruit from "app/recruits/queries/getRecruit"
import deleteRecruit from "app/recruits/mutations/deleteRecruit"
import { Descriptions, Button, message } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createApply from "app/applies/mutations/createApply"
import getApplies from "app/applies/queries/getApplies"
import createCollect from "app/collects/mutations/createCollect"
import getCollects from "app/collects/queries/getCollects"

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />
export const Recruit = () => {
  const router = useRouter()
  const recruitId = useParam("recruitId", "number")
  const [deleteRecruitMutation] = useMutation(deleteRecruit)
  const [recruit] = useQuery(getRecruit, {
    id: recruitId,
  })
  const [createApplication] = useMutation(createApply)

  const currentUser = useCurrentUser()
  const d = new Date(recruit?.updatedAt)
  const date =
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1) +
    "-" +
    d.getDate() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes() +
    ":" +
    d.getSeconds()
  const [{ applies }] = usePaginatedQuery(getApplies, {
    orderBy: {
      id: "asc",
    },
    skip: 0,
    take: 100,
  })
  const [{ collects }] = usePaginatedQuery(getCollects, {
    orderBy: {
      id: "asc",
    },
    skip: 0,
    take: 100,
  })
  const [isApplied, setApplied] = useState(
    applies.some((item, index, arr) => {
      return item.userId === currentUser.id && item.recruitId === recruit.id
    })
  )
  const [isCollected, setCollected] = useState(
    collects.some((item, index, arr) => {
      return item.userId === currentUser.id && item.recruitId === recruit.id
    })
  )
  return (
    <>
      <Head>
        <title>
          {recruit.id}：{recruit.name}
        </title>
      </Head>

      <div>
        <Descriptions title="职位发布者">
          <Descriptions.Item label="Name">{recruit?.user?.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{recruit?.user?.email}</Descriptions.Item>
        </Descriptions>

        <Descriptions title="岗位介绍">
          <Descriptions.Item label="岗位名称">{recruit.name}</Descriptions.Item>
          <Descriptions.Item label="最近更新于">{date}</Descriptions.Item>
          <Descriptions.Item label="薪酬">
            {recruit.salaryMin}-{recruit.salaryMax}
          </Descriptions.Item>
          <Descriptions.Item label="职位简介">{recruit.description}</Descriptions.Item>
          <Descriptions.Item label="职位描述">{recruit.detail}</Descriptions.Item>
        </Descriptions>

        {currentUser.role === "COMPANY" && currentUser.id === recruit.userId ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: 10,
            }}
          >
            <Button type="primary">
              <Link
                href={Routes.EditRecruitPage({
                  recruitId: recruit.id,
                })}
              >
                <a>编辑</a>
              </Link>
            </Button>
            <Button
              onClick={async () => {
                if (window.confirm("确定删除？")) {
                  await deleteRecruitMutation({
                    id: recruit.id,
                  })
                  router.push(Routes.RecruitsPage())
                }
              }}
              style={{
                marginLeft: "0.5rem",
              }}
            >
              删除
            </Button>
          </div>
        ) : (
          currentUser.role === "USER" && (
            <>
              <div style={{ cssFloat: "right", margin: 10 }}>
                <Button
                  type="primary"
                  onClick={async () => {
                    await createApplication({
                      userId: currentUser.id,
                      recruitId: recruit.id,
                    })
                    message.success("申请成功")
                    setApplied(true)
                  }}
                  disabled={isApplied}
                >
                  {isApplied ? "已申请" : "申请"}
                </Button>
              </div>
              <div style={{ cssFloat: "right", margin: 10 }}>
                <Button
                  type="primary"
                  onClick={async () => {
                    await createCollect({
                      userId: currentUser.id,
                      recruitId: recruit.id,
                    })
                    message.success("收藏成功")
                    setCollected(true)
                  }}
                  disabled={isCollected}
                >
                  {isCollected ? "已收藏" : "收藏"}
                </Button>
              </div>
            </>
          )
        )}
      </div>
    </>
  )
}

const ShowRecruitPage = () => {
  return (
    <>
      <Button type="primary" style={{ marginTop: 10 }}>
        <Link href={Routes.RecruitsPage()}>
          <a>返回招聘信息列表</a>
        </Link>
      </Button>

      <Suspense fallback={antIcon}>
        <Recruit />
      </Suspense>
    </>
  )
}

ShowRecruitPage.authenticate = true

ShowRecruitPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRecruitPage

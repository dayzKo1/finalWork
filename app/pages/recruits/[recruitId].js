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
import { Descriptions, Button, message, Card } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createApply from "app/applies/mutations/createApply"
import getApplies from "app/applies/queries/getApplies"
import createCollect from "app/collects/mutations/createCollect"
import getCollects from "app/collects/queries/getCollects"
import deleteCollect from "app/collects/mutations/deleteCollect"

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
  const [Collected, setCollected] = useState(
    collects.some((item, index, arr) => {
      return item.userId === currentUser.id && item.recruitId === recruit.id
    })
  )

  return (
    <div>
      <Head>
        <title>
          {recruit.id}：{recruit.name}
        </title>
      </Head>

      <div style={{ marginTop: 20 }}>
        <Card>
          <Descriptions
            title="职位发布者"
            bordered
            layout="vertical"
            style={{ margin: 10 }}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="姓名">{recruit?.user?.name}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{recruit?.user?.email}</Descriptions.Item>
            <Descriptions.Item label="公司性质">{recruit?.user?.companyKind}</Descriptions.Item>
            <Descriptions.Item label="公司规模">{recruit?.user?.companySize}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <Descriptions
            title="岗位介绍"
            bordered
            layout="vertical"
            style={{ margin: 10 }}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="岗位名称">{recruit.name}</Descriptions.Item>
            <Descriptions.Item label="最近更新">{date}</Descriptions.Item>
            <Descriptions.Item label="岗位薪酬">
              {recruit.salaryMin}-{recruit.salaryMax}
            </Descriptions.Item>
            <Descriptions.Item label="工作城市">{recruit.city}</Descriptions.Item>
            <Descriptions.Item label="工作经验">{recruit.year}</Descriptions.Item>
            <Descriptions.Item label="教育经历">{recruit.educ}</Descriptions.Item>
            <Descriptions.Item label="工作类型">{recruit.type}</Descriptions.Item>
            <Descriptions.Item label="招聘人数">{recruit.avai}</Descriptions.Item>
            <Descriptions.Item label="职位简介">{recruit.description}</Descriptions.Item>
            <Descriptions.Item label="职位描述">{recruit.detail}</Descriptions.Item>
          </Descriptions>
        </Card>

        {currentUser.role === "COMPANY" && currentUser.id === recruit.userId ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: 10,
              }}
            >
              <Button type="primary" style={{ marginRight: 10 }}>
                <Link href={Routes.RecruitsPage()}>
                  <a>返回招聘信息列表</a>
                </Link>
              </Button>
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
          </>
        ) : (
          currentUser.role === "USER" && (
            <div>
              <div style={{ cssFloat: "right", marginRight: 20 }}>
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
              <div style={{ cssFloat: "right", marginRight: 20 }}>
                <Button
                  type="primary"
                  onClick={async () => {
                    if (!Collected) {
                      await createCollect({
                        userId: currentUser?.id,
                        recruitId: recruit?.id,
                      })
                      message.success("收藏成功")
                      setCollected(!Collected)
                    } else {
                      await deleteCollect({
                        userId: currentUser?.id,
                        recruitId: recruit?.id,
                      })
                      message.success("取消收藏成功")
                      setCollected(!Collected)
                    }
                  }}
                  danger={Collected}
                >
                  {Collected ? "收藏√" : "收藏"}
                </Button>
              </div>
            </div>
          )
        )}
      </div>
      <style jsx>{`
        :global(.ant-descriptions-bordered .ant-descriptions-item-label) {
           {
            /* background-color:cornflowerblue; */
          }
        }
      `}</style>
    </div>
  )
}

const ShowRecruitPage = () => {
  return (
    <div style={{ width: 1040 }}>
      <Suspense fallback={antIcon}>
        <Recruit />
      </Suspense>
    </div>
  )
}

ShowRecruitPage.authenticate = true

ShowRecruitPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRecruitPage

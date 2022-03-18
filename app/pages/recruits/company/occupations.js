import { Suspense, useState, useReducer } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, Image, useMutation } from "blitz"
import { Router } from "next/dist/client/router"

import Layout from "app/core/layouts/Layout"
import { Button, Card, Tag, message, Input, Empty, Modal, Table, Space, Divider } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { FixedSizeList as List } from "react-window"
import SideCards from "app/pages/components/SideCards"
const { Search } = Input
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />

// controller
import getRecruits from "app/recruits/queries/getRecruits"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createApply from "app/applies/mutations/createApply"
import getApplies from "app/applies/queries/getApplies"
import createCollect from "app/collects/mutations/createCollect"
import getCollects from "app/collects/queries/getCollects"
import deleteCollect from "app/collects/mutations/deleteCollect"
import updateApply from "app/applies/mutations/updateApply"

export const AppliesList = () => {
  const [updateApplyMutation] = useMutation(updateApply)
  const [click, setClick] = useState(["default1"])

  const router = useRouter()
  const currentUser = useCurrentUser()
  const [{ collects }] = usePaginatedQuery(getCollects, {
    orderBy: {
      id: "asc",
    },
    skip: 0,
    take: 100,
  })

  const [{ recruits, count }] = usePaginatedQuery(getRecruits, {
    orderBy: {
      id: "asc",
    },
  })
  const [{ applies }] = usePaginatedQuery(getApplies, {
    orderBy: {
      id: "asc",
    },
  })

  const [recruitData, setRecruData] = useState(
    recruits.filter((item, index) => {
      return item.userId === currentUser.id
    })
  )

  const appliers = (id) => {
    return applies.filter((item, index) => {
      return item.recruitId === id
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
              {recruitData[index]?.salaryMin}-{recruitData[index]?.salaryMax}
              <Divider type="vertical" />
              {recruitData[index]?.city} <Divider type="vertical" />
              {recruitData[index]?.year} <Divider type="vertical" />
              {recruitData[index]?.educ} <Divider type="vertical" />招{recruitData[index]?.avai}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: 10 }}>
              申请人数 :{" "}
              {
                appliers(recruitData[index].id).map((item, index) => {
                  return item
                }).length
              }
            </div>
            <Button
              type="primary"
              style={{ marginRight: 10 }}
              onClick={() =>
                showModal(
                  appliers(recruitData[index].id).map((item, index) => {
                    return item
                  })
                )
              }
            >
              查看申请者
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
  const [applierData, setApplierData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = (data) => {
    setIsModalVisible(true)
    const newData = []
    data.map((item, index) => {
      newData[index] = {
        ...item.user,
        applyId: item.id,
        status: item.status,
      }
    })
    setApplierData(newData)
    setClick([
      ...(newData?.map((item) => item.status === false && item.applyId) ?? ["default2"]),
      ...click,
    ])
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "简历",
      dataIndex: "resume",
      key: "resume",
      render: (v) => <Button type="primary">查看</Button>,
    },
    {
      title: "操作",
      key: "control",
      dataIndex: "applyId",
      render: (v, row) => (
        <Space size="middle">
          <Button type="primary">沟通</Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              updateApplyMutation({ id: v, status: false })
              setClick([...click, v])
              message.info("已拒绝")
            }}
            disabled={click.includes(v)}
          >
            {click.includes(v) === true ? "已拒绝" : "拒绝"}
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Modal
        title="申请者"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Table columns={columns} dataSource={applierData} pagination={false}></Table>
      </Modal>
      <h2 style={{ color: "wheat", marginTop: 15, textAlign: "center" }}>我的职位</h2>
      <div
        style={{
          display: "flex",
          marginTop: 20,
          width: 1200,
        }}
      >
        <div>
          {recruitData.length > 0 ? (
            <List
              className="List"
              height={600}
              itemCount={recruitData.length}
              itemSize={130}
              width={900}
            >
              {Row}
            </List>
          ) : (
            <Empty
              style={{ height: 600, width: 900, background: "white", padding: 50, margin: 0 }}
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
        <SideCards top={-10} />

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

const AppliesPage = () => {
  const currentUser = useCurrentUser()
  return (
    <>
      <Head>
        <title>我的职位</title>
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

import { Suspense, useState, useReducer } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, Image, useMutation } from "blitz"

import Layout from "app/core/layouts/Layout"
import {
  Button,
  Card,
  Tag,
  message,
  Input,
  Empty,
  Modal,
  Table,
  Space,
  Divider,
  Descriptions,
  Badge,
  Select,
} from "antd"
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

import getResumes from "app/resumes/queries/getResumes"
import { toast } from "@chakra-ui/react"

const { Option } = Select

export const AppliesList = () => {
  const [updateApplyMutation] = useMutation(updateApply)
  const [click, setClick] = useState(["default1"])

  const router = useRouter()
  const currentUser = useCurrentUser()

  const [{ collects }] = usePaginatedQuery(getCollects, {
    orderBy: {
      id: "asc",
    },
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

  const [{ resumes }] = usePaginatedQuery(getResumes, {
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

  const [resumeData, setResumeData] = useState()
  const [resumeModal, setResumeModal] = useState()

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

  const showResume = (id) => {
    setResumeData(resumes.filter((item) => item.userId === id))
    setResumeModal(true)
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
      dataIndex: "id",
      key: "id",
      render: (v) => (
        <Button type="primary" onClick={() => showResume(v)}>
          {" "}
          查看
        </Button>
      ),
    },
    {
      title: "操作",
      key: "control",
      dataIndex: "applyId",
      render: (v, row) => (
        <Space size="middle">
          <Button type="primary" href="https://mail.qq.com/" target="_blank">
            沟通
          </Button>

          {/* <Button
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
          </Button> */}
          <Select
            style={{ width: 150, height: 40, fontSize: 18 }}
            onChange={(value) => {
              updateApplyMutation({ id: v, status: value })
            }}
            defaultValue={row.status}
            placeholder={row.status}
          >
            <Option key={0} value="待定">
              待定
            </Option>
            <Option key={1} value="材料不足">
              材料不足
            </Option>
            <Option key={2} value="录取">
              录取
            </Option>
            <Option key={3} value="拒绝">
              拒绝
            </Option>
          </Select>
        </Space>
      ),
    },
  ]
  const columnsResume = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "电话",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "求职状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "求职意向",
      dataIndex: "prefer",
      key: "prefer",
    },
    {
      title: "个人优势/作品",
      dataIndex: "advance",
      key: "advance",
    },
    {
      title: "教育经历",
      dataIndex: "educ",
      key: "educ",
    },
    {
      title: "工作/实习经历",
      dataIndex: "inte",
      key: "inte",
    },
    {
      title: "项目经历",
      dataIndex: "proj",
      key: "proj",
    },
    {
      title: "学生干部经历",
      dataIndex: "stud",
      key: "stud",
    },
    {
      title: "语言能力",
      dataIndex: "lang",
      key: "lang",
    },
    {
      title: "专业技能",
      dataIndex: "skil",
      key: "skil",
    },
    {
      title: "证书",
      dataIndex: "cert",
      key: "cert",
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
        width={600}
      >
        <Table columns={columns} dataSource={applierData} pagination={false}></Table>
      </Modal>
      <Modal
        title="简历"
        visible={resumeModal}
        footer={false}
        onCancel={() => setResumeModal(false)}
        width={600}
      >
        {/* <Table columns={columnsResume} dataSource={resumeData} pagination={false} scroll={{ x: 600 }} ></Table> */}
        <Descriptions layout="vertical" bordered style={{ height: 600, overflowY: "scroll" }}>
          <Descriptions.Item label="姓名" span={1}>
            {resumeData && resumeData[0]?.name}
          </Descriptions.Item>
          <Descriptions.Item label="性别" span={1}>
            {resumeData && resumeData[0]?.gender}
          </Descriptions.Item>
          <Descriptions.Item label="求职状态" span={1}>
            {/* <Badge status="processing" text={resumeData && recruitData[0]?.status} /> */}
            {resumeData && recruitData[0]?.status}
          </Descriptions.Item>
          <Descriptions.Item label="求职意向" span={1}>
            {resumeData && resumeData[0]?.prefer}
          </Descriptions.Item>
          <Descriptions.Item label="电话" span={2}>
            {resumeData && resumeData[0]?.number}
          </Descriptions.Item>
          <Descriptions.Item label="个人优势/作品" span={3}>
            {resumeData && resumeData[0]?.advancea}
          </Descriptions.Item>
          <Descriptions.Item label="教育经历" span={3}>
            {resumeData && resumeData[0]?.educ}
          </Descriptions.Item>
          <Descriptions.Item label="工作/实习经历" span={3}>
            {resumeData && resumeData[0]?.inte}
          </Descriptions.Item>
          <Descriptions.Item label="语言能力" span={3}>
            {resumeData && resumeData[0]?.lang}
          </Descriptions.Item>
          <Descriptions.Item label="专业技能" span={3}>
            {resumeData && resumeData[0]?.skil}
          </Descriptions.Item>
          <Descriptions.Item label="证书" span={3}>
            {resumeData && resumeData[0]?.cert}
          </Descriptions.Item>
          <Descriptions.Item label="项目经历" span={3}>
            {resumeData && resumeData[0]?.proj}
          </Descriptions.Item>
        </Descriptions>
        ,
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
            {currentUser?.role === "COMPANY" && (
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

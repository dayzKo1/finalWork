import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import { Button, List, Divider, Card, Row, Col, Table } from "antd"
import getRecords from "app/users/queries/getRecords"
import { getDate } from "../util/utils"

const columns = [
  {
    dataIndex: ["user", "name"],
    title: "用户名",
  },
  {
    title: "用户类型",
    dataIndex: ["user", "role"],
    render: (v) => (v === "USER" ? "求职者" : "企业"),
    filters: [
      {
        text: "求职者",
        value: "USER",
      },
      {
        text: "企业",
        value: "COMPANY",
      },
    ],
    onFilter: (value, record) => record.user.role.indexOf(value) === 0,
  },
  {
    title: "注册时间",
    dataIndex: ["user", "createdAt"],
    render: (v) => getDate(v),
    sorter: (a, b) => Date.parse(a.user.createdAt) - Date.parse(b.user.createdAt),
  },
  {
    title: "最近访问",
    dataIndex: "updatedAt",
    render: (v) => getDate(v),
    sorter: (a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt),
  },
  {
    title: "登录次数",
    dataIndex: "times",
    sorter: (a, b) => a.times - b.times,
  },
]

const Graph1 = () => {
  const [{ records }] = usePaginatedQuery(getRecords, {
    orderBy: {
      id: "asc",
    },
  })
  return (
    <div>
      <h3>
        <strong>最近访客</strong>
      </h3>
      <div>
        <Table columns={columns} dataSource={records} pagination={false} scroll={{ y: 230 }} />
      </div>
    </div>
  )
}

export default Graph1

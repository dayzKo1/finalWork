import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import { Button, List, Divider, Card, Row, Col, Table } from "antd"
import getRecruits from "app/recruits/queries/getRecruits"
import getApplies from "app/applies/queries/getApplies"
import { getDate } from "app/util/utils"

const Graph2 = () => {
  const [{ applies }] = usePaginatedQuery(getApplies, {
    orderBy: {
      id: "asc",
    },
  })
  const [{ recruits }] = usePaginatedQuery(getRecruits, {
    orderBy: {
      id: "asc",
    },
  })

  const frquency = {}
  applies.forEach((ele) => {
    if (frquency.hasOwnProperty(ele.recruitId)) {
      frquency[ele.recruitId] += 1
    } else {
      frquency[ele.recruitId] = 1
    }
  })

  const top10 = Object.keys(frquency)
    .sort((a, b) => {
      return frquency[b] - frquency[a]
    })
    .slice(0, 10)

  const hotData = recruits.filter((item) => top10.includes(item.id.toString()))

  const columns = [
    {
      dataIndex: "name",
      title: "职位名",
      render: (v, r) => (
        <Link
          href={Routes.ShowRecruitPage({
            recruitId: r.id,
          })}
        >
          <a>{v}</a>
        </Link>
      ),
    },
    {
      title: "发布者",
      dataIndex: ["user", "name"],
    },
    {
      title: "申请数",
      dataIndex: "id",
      render: (v) => frquency[v],
      sorter: (a, b) => frquency[a.id] - frquency[b.id],
      defaultSortOrder: "descend",
    },
  ]
  return (
    <div>
      <h3>
        <strong>热门职位TOP10</strong>
      </h3>
      <div>
        <Table columns={columns} dataSource={hotData} pagination={false} scroll={{ y: 250 }} />
      </div>
    </div>
  )
}

export default Graph2

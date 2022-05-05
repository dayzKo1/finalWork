import { Card, Divider, Row, Col, Avatar } from "antd"
import { useRouter, usePaginatedQuery, Routes } from "blitz"
import { UserOutlined } from "@ant-design/icons"
import getApplies from "app/applies/queries/getApplies"
import getRecruits from "app/recruits/queries/getRecruits"

const HotRru = () => {
  const router = useRouter()
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

  const top6 = Object.keys(frquency)
    .sort((a, b) => {
      return frquency[b] - frquency[a]
    })
    .slice(0, 6)
  const hotData = recruits.filter((item) => top6.includes(item.id.toString()))
  return (
    <div style={{ width: 1200 }}>
      <Card bodyStyle={{ padding: 0 }} style={{ background: "transparent" }} bordered={false}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Divider plain style={{ minWidth: 0, width: "30%", fontSize: 24, fontWeight: 600 }}>
            热招岗位
          </Divider>
        </div>

        <Row gutter={16}>
          {hotData.map((item, index) => {
            return (
              <Col key={index} span={8} style={{ marginBottom: 10 }}>
                <Card
                  headStyle={{ margin: "0 20px" }}
                  hoverable
                  style={{ background: "white" }}
                  title={
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: 600,
                        }}
                      >
                        <div>{item.name}</div>
                        <div>
                          {item.salaryMin}-{item.salaryMax}
                        </div>
                      </div>
                      <div>
                        {item.city}
                        <Divider style={{ color: "white" }} type="vertical" />
                        {item.year}
                        <Divider type="vertical" />
                        {item.educ}
                      </div>
                    </div>
                  }
                  bordered={false}
                  onClick={() =>
                    router.push(
                      Routes.ShowRecruitPage({
                        recruitId: item.id,
                      })
                    )
                  }
                >
                  <div style={{ display: "flex", alignItems: "center", marginLeft: 20 }}>
                    <div>
                      <Avatar icon={<UserOutlined />} style={{ marginRight: 10 }} />
                    </div>
                    <div>
                      {item.user.name}
                      <div>
                        {item.user.companyKind}
                        <Divider type="vertical" />
                        {item.user.companySize}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Card>
    </div>
  )
}

export default HotRru

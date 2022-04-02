import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import { Button, List, Divider, Card, Row, Col, Table } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

import Graph1 from "./Graph1"
import Graph2 from "./Graph2"
import Graph3 from "./Graph3"
import Graph4 from "./Graph4"

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />

const Analysis = () => {
  return (
    <>
      <Head>
        <title>Questions</title>
      </Head>

      <div style={{ marginTop: 20 }}>
        {/* <Suspense fallback={antIcon}> */}
        <Row style={{ width: 1200, margin: 10 }}>
          <Col span={12}>
            <Card style={{ height: 380, width: 560, margin: 10 }}>
              {/* 访客记录 */}
              <Graph1 />
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ height: 380, width: 560, margin: 10 }}>
              {/* 热门职位TOP10 */}
              <Graph2 />
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ height: 380, width: 560, margin: 10 }}>
              {/* 职位来源 */}
              <Graph3 />
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ height: 380, width: 560, margin: 10 }}>
              <Graph4 />
            </Card>
          </Col>
        </Row>
        {/* </Suspense> */}
      </div>
    </>
  )
}

Analysis.authenticate = true

Analysis.getLayout = (page) => <Layout title="Analysis">{page}</Layout>

export default Analysis

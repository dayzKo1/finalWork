import React, { useState } from "react"
import { Image, Link, useMutation, Routes, useRouter } from "blitz"
import { Input, Affix, Tabs, Row, Col, Divider, Button, Card, BackTop } from "antd"
import {
  RightOutlined,
  UpOutlined,
  HeartOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  ReconciliationOutlined,
  HighlightOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import Layout from "app/core/layouts/Layout"
import Item from "antd/lib/list/Item"
import { set } from "zod"

const { TabPane } = Tabs
const { Search } = Input

const SearchHome = (props) => {
  const router = useRouter()
  const { affixed } = props
  const onSearch = (value) => {
    router.push(Routes.RecruitsPage({ search: value }))
  }

  return (
    <div
      style={{
        height: 130,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        background: !affixed ? "transparent" : "white",
        boxShadow: !affixed ? "" : "2px 2px 2px #888888",
      }}
    >
      <Search
        placeholder="搜索职位、公司"
        allowClear
        enterButton="搜索"
        size="large"
        onSearch={onSearch}
        style={{
          width: 1060,
          animation: affixed && "showSearchBox .35s linear both",
        }}
      />
    </div>
  )
}

const MenuHome = () => {
  const categoryData = [
    {
      name: "互联网IT",
      children: [
        "Java开发",
        "UI设计师",
        "Web前端",
        "PHP",
        "Python",
        "Android",
        "美工",
        "深度学习",
        "算法工程师",
        "Hadoop",
        "Node.js",
        "数据开发",
        "数据分析师",
        "数据架构",
        "人工智能",
        "区块链",
        "电气工程师",
        "电子工程师",
        "PLC",
        "测试工程师",
        "设备工程师",
        "硬件工程师",
        "结构工程师",
        "工艺工程师",
        "产品经理",
        "新媒体运营",
        "运营专员",
        "产品助理",
        "产品运营",
        "游戏运营",
      ],
    },
    {
      name: "金融",
      children: [
        "投资经理",
        "风控",
        "催收",
        "银行柜员",
        "银行销售",
        "信审",
        "信用卡",
        "贷款",
        "金融产品",
        "汽汽金融",
        "金融研究",
        "证券",
        "交易员",
        "投资经理",
        "期货",
        "操盘手",
        "基金",
        "股票",
        "投资顾问",
        "信托",
        "典当",
        "担保",
        "信贷",
        "权证",
        "财产保险",
        "保险内勤",
        "理赔",
        "精算师",
        "保险销售",
        "理财顾问",
        "查勘定损",
        "车险",
      ],
    },
    {
      name: "房地产/建筑",
      children: [
        "土建工程师",
        "施工员",
        "资料员",
        "预算员",
        "造价员",
        "一级建造师",
        "室纳设计师",
        "土建",
        "暖通",
        "项目经理",
        "电气工程师",
        "建筑设计",
        "置业顾问",
        "房地产销售",
        "房地产招商",
        "开发报建",
        "房地产策划",
        "房地产开发",
        "房地产评估",
        "地产经纪",
        "物业",
        "物业经理",
        "物业管理",
        "物业客服",
        "电工",
        "物业主管",
        "物业维修",
        "消防",
        "客服主管",
        "前台",
        "文员",
        "物业项目经理",
      ],
    },
    {
      name: "贸易/零售/物流",
      children: [
        "采购",
        "外贸",
        "外贸业务员",
        "外贸跟单",
        "采购助理",
        "外贸日语",
        "采购专员",
        "外贸英语",
        "外贸助理",
        "采购经理",
        "买手",
        "导购",
        "营业员",
        "店长",
        "收银员",
        "销售",
        "导购员",
        "督导",
        "客服",
        "新零售产品",
        "理货员",
        "供应链",
        "物流专员",
        "物流经理",
        "物流运营",
        "物流跟单",
        "物流管理",
        "物仓调度",
        "货运代理",
        "报检报关",
        "仓储管理",
      ],
    },
    {
      name: "教育/传媒/广告",
      children: [
        "教师",
        "英语老师",
        "课程顾问",
        "英语",
        "教务",
        "美术老师",
        "幼教",
        "小学教师",
        "班主任",
        "助教",
        "编导",
        "摄影师",
        "编剧",
        "摄影",
        "后期制作",
        "制片",
        "记者",
        "剪辑",
        "化妆师",
        "广告创意",
        "美术指导",
        "策划经理",
        "文案",
        "广告制作",
        "媒介",
        "广告审核",
        "平面设计",
        "网页设计",
        "插画师",
        "工业设计",
        "视觉设计",
      ],
    },
    {
      name: "服务业",
      children: [
        "美容师",
        "美容学徒",
        "美容导师",
        "纹绣师",
        "医美",
        "美甲师",
        "健身教练",
        "导游",
        "旅游顾问",
        "旅游计调",
        "签证",
        "旅游销售",
        "票务",
        "服务员",
        "收银员",
        "店长",
        "酒店前台",
        "酒店管理",
        "餐饮管理",
        "收银",
        "保安",
        "保洁",
        "月嫂",
        "保姆",
        "家政",
        "婚礼策划",
        "育婴师",
        "催乳师",
        "司机",
      ],
    },
    {
      name: "市场/销售",
      children: [
        "投资经理",
        "风控",
        "催收",
        "银行柜员",
        "银行销售",
        "信审",
        "信用卡",
        "贷款",
        "金融产品",
        "汽汽金融",
        "金融研究",
        "证券",
        "交易员",
        "投资经理",
        "期货",
        "操盘手",
        "基金",
        "股票",
        "投资顾问",
        "信托",
        "典当",
        "担保",
        "信贷",
        "权证",
        "财产保险",
        "保险内勤",
        "理赔",
        "精算师",
        "保险销售",
        "理财顾问",
        "查勘定损",
        "车险",
      ],
    },
    {
      name: "人事/财务/行政",
      children: [
        "投资经理",
        "风控",
        "催收",
        "银行柜员",
        "银行销售",
        "信审",
        "信用卡",
        "贷款",
        "金融产品",
        "汽汽金融",
        "金融研究",
        "证券",
        "交易员",
        "投资经理",
        "期货",
        "操盘手",
        "基金",
        "股票",
        "投资顾问",
        "信托",
        "典当",
        "担保",
        "信贷",
        "权证",
        "财产保险",
        "保险内勤",
        "理赔",
        "精算师",
        "保险销售",
        "理财顾问",
        "查勘定损",
        "车险",
      ],
    },
  ]
  const [key, setKey] = useState("")
  const tabChange = (e) => {
    switch (e.target.innerText) {
      case "互联网IT":
        setKey("0")
        break
      case "金融":
        setKey("1")
        break
      case "房地产/建筑":
        setKey("2")
        break
      case "贸易/零售/物流":
        setKey("3")
        break
      case "教育/传媒/广告":
        setKey("4")
        break
      case "服务业":
        setKey("5")
        break
      case "市场/销售":
        setKey("6")
        break
      case "人事/财务/行政":
        setKey("7")
        break
    }
  }
  return (
    <Tabs
      tabPosition="left"
      style={{
        background: "white",
        height: 430,
        marginRight: 10,
      }}
      activeKey={key}
      onMouseOver={(e) => tabChange(e)}
      onMouseLeave={() => {
        setKey("")
      }}
    >
      {categoryData.map((item, index) => {
        return (
          <TabPane
            onMouseOver={(e) => tabChange(e)}
            tab={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: 180,
                  alignItems: "center",
                }}
              >
                {item.name}
                <RightOutlined
                  style={{ color: "#aaa", display: key === index.toString() ? "none" : "flex" }}
                />
              </div>
            }
            key={index}
            style={{
              position: "absolute",
              zIndex: 2,
              background: "white",
              width: 800,
              height: 430,
              overflowX: "hidden",
              overflowY: "scroll",
            }}
          >
            <h2>
              <strong>{item.name}</strong>
            </h2>
            <Divider style={{ minWidth: "20%", width: "97%" }} />
            <Row>
              {item.children.map((item, index) => {
                return (
                  <Col key={index} span={6} style={{ padding: 5 }}>
                    <Button type="text">
                      <Link href={Routes.RecruitsPage({ search: item })}>{item}</Link>
                    </Button>
                  </Col>
                )
              })}
            </Row>
          </TabPane>
        )
      })}
    </Tabs>
  )
}

const HeaderHome = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", width: 665, marginRight: 10 }}>
        <Card
          hoverable
          style={{ width: 665, height: 265, margin: "0 0 5px 0", borderRadius: 10 }}
          cover={<Image layout="fill" alt="" src="/header/header1.jpg" />}
        ></Card>
        <Card
          hoverable
          style={{ width: 1065, height: 160, margin: "0 0 5px 0", borderRadius: 10 }}
          cover={<Image layout="fill" alt="" src="/header/header2.jpg" />}
        ></Card>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", width: 300 }}>
        <Card
          hoverable
          style={{ width: 300, height: 130, margin: "0 0 5px 0", borderRadius: 10 }}
          cover={<Image layout="fill" alt="" src="/header/header3.jpg" />}
        ></Card>
        <Card
          hoverable
          style={{ width: 300, height: 130, margin: "0 0 5px 0", borderRadius: 10 }}
          cover={<Image layout="fill" alt="" src="/header/header4.jpg" />}
        ></Card>
        <Card
          hoverable
          style={{ width: 300, height: 160, margin: "0 0 5px 0", borderRadius: 10 }}
          cover={<Image layout="fill" alt="" src="/header/header5.jpg" />}
        ></Card>
      </div>
    </div>
  )
}

const HotRru = () => {
  const hotData = [
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
  ]
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
                        <div>{item.RecruName}</div>
                        <div>{item.salary}</div>
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
                >
                  <div style={{ margin: "0 20px" }}>
                    <div>{item.CompanyName}</div>
                    <div>
                      {item.type}
                      <Divider type="vertical" />
                      {item.size}
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

const HotComp = () => {
  const hotData = [
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
    {
      RecruName: "前端工程师",
      salary: "1.2万-1.6万",
      city: "上海",
      year: "3-5年",
      educ: "本科",
      CompanyName: "彩付(上海)智能科技有限公司",
      type: "民营",
      size: "20-99人",
    },
  ]
  return (
    <div style={{ width: 1200 }}>
      <Card bodyStyle={{ padding: 0 }} style={{ background: "transparent" }} bordered={false}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Divider plain style={{ minWidth: 0, width: "30%", fontSize: 24, fontWeight: 600 }}>
            热门企业
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
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>{item.RecruName}</div>
                        <div>{item.salary}</div>
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
                >
                  <div style={{ margin: "0 20px" }}>
                    <div>{item.CompanyName}</div>
                    <div>
                      {item.type}
                      <Divider type="vertical" />
                      {item.size}
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

const MenuSide = (props) => {
  const [hover, setHover] = useState(false)
  const { affixed } = props
  const sideData = [
    {
      name: "首页",
      icon: <HomeOutlined />,
      href: Routes.Home(),
    },
    {
      name: "问答",
      icon: <QuestionCircleOutlined />,
      href: Routes.QuestionsPage(),
    },
    {
      name: "职位",
      icon: <ReconciliationOutlined />,
      href: Routes.RecruitsPage(),
    },
    {
      name: "求职",
      icon: <HighlightOutlined />,
      href: Routes.Home(),
    },
    {
      name: "设置",
      icon: <SettingOutlined />,
      href: Routes.Home(),
    },
  ]
  return (
    <div
      style={{
        position: "fixed",
        background: "white",
        zIndex: 1000,
        right: 0,
        bottom: 0,
        textAlign: "center",
        height: affixed ? "100vh" : "calc(100vh - 64px)",
        width: hover ? 80 : 50,
        transition: "width 0.2s, height 0.2s",
        cursor: "pointer",
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* <HeartOutlined /> */}
      <div
        style={{
          paddingTop: "10vh",
          height: "40vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {sideData.map((item, index) => {
          return (
            <Link href={item.href} key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: 20 }}>{item.icon}</div>
                <div
                  style={{
                    fontSize: 10,
                    color: hover ? "black" : "white",
                    transition: "color 0.3s",
                  }}
                >
                  {item.name}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div
        style={{
          paddingTop: "10vh",
          height: "40vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {sideData.map((item, index) => {
          return (
            <Link href={item.href} key={index}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 20 }}>{item.icon}</div>
                <div
                  style={{
                    fontSize: 10,
                    color: hover ? "black" : "white",
                    transition: "color 0.3s",
                  }}
                >
                  {item.name}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

const Home = () => {
  const [affixed, setAffixed] = useState(false)

  return (
    <>
      <Affix offsetTop={0} style={{ width: 1916, zIndex: 999 }} onChange={(e) => setAffixed(e)}>
        <SearchHome affixed={affixed} />
      </Affix>

      <MenuSide affixed={affixed} />
      <div
        style={{
          display: "flex",
        }}
      >
        <MenuHome />
        <HeaderHome />
      </div>

      <HotRru />

      <HotComp />

      <BackTop visibilityHeight={0} style={{ marginRight: "20vh", marginBottom: "20vh" }}>
        <Button shape="circle" style={{ boxShadow: "2px 2px 2px #888888" }}>
          <UpOutlined />
        </Button>
      </BackTop>

      {/* <Graph /> */}
      <style jsx global>
        {`
          @keyframes showSearchBox {
            0% {
              transform: translate(0, -25px);
            }
            35.2% {
              transform: translate(0, -0.49px);
            }
            52.9% {
              transform: translate(0, -6.24px);
            }
            70.5% {
              transform: translate(0, -0.62px);
            }
            82.3% {
              transform: translate(0, -1.48px);
            }
            88.2% {
              transform: translate(0, -0.23px);
            }
            94.1% {
              transform: translate(0, -0.38px);
            }
            100% {
              transform: translate(0, 0);
            }
          }
        `}
      </style>
    </>
  )
}

Home.suppressFirstRenderFlicker = true

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home

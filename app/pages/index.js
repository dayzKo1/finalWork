import { Image, Link, useMutation, Routes } from "blitz"
import { Input, Carousel, Tabs } from "antd"
import { StickyContainer, Sticky } from "react-sticky"
import Layout from "app/core/layouts/Layout"
const { Search } = Input
const { TabPane } = Tabs

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
    )}
  </Sticky>
)

const contentStyle = {
  height: "160px",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  lineHeight: "160px",
}

const Home = () => {
  const onSearch = (value) => console.log(value)

  return (
    <>
      <Carousel autoplay effect="fade" style={{ maxWidth: 1903 }}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>

      <Search
        placeholder="搜索职位、公司"
        allowClear
        enterButton="搜索"
        size="large"
        onSearch={onSearch}
        style={{ maxWidth: 900, margin: "5rem 0" }}
      />

      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} style={{ background: "white" }}>
          <TabPane
            tab="Tab 1"
            key="1"
            // style={{ height: 2000 }}
          >
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2" style={{ height: 2000 }}>
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3" style={{ height: 2000 }}>
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </StickyContainer>

      <style jsx global>
        {``}
      </style>
    </>
  )
}

Home.suppressFirstRenderFlicker = true

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home

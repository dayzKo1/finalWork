import { Image, Link, useMutation, Routes } from "blitz"
import { Input, Carousel, Tabs } from "antd"
import { StickyContainer, Sticky } from "react-sticky"
import Layout from "app/core/layouts/Layout"
import carousel1 from "public/mountains.jpg"
const { Search } = Input
const { TabPane } = Tabs

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
    )}
  </Sticky>
)

const Home = () => {
  const onSearch = (value) => console.log(value)

  return (
    <>
      {/* <Carousel dots={false} autoplay effect="fade" style={{ maxWidth: 1903, maxHeight: 50 }} >
        <div>
          <Image src={carousel1} alt="" />
        </div>
        <div>
          <Image src={carousel1} alt="" />
        </div>
        <div>
          <Image src={carousel1} alt="" />
        </div>
        <div>
          <Image src={carousel1} alt="" />
        </div>
      </Carousel> */}

      <Search
        placeholder="搜索职位、公司"
        allowClear
        enterButton="搜索"
        size="large"
        onSearch={onSearch}
        style={{ width: 900, margin: "10rem 0" }}
      />

      <StickyContainer>
        <Tabs
          defaultActiveKey="1"
          renderTabBar={renderTabBar}
          style={{ color: "white", maxHeight: 840 }}
        >
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
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

import { Suspense } from "react"
import { Image, Link, useMutation, Routes } from "blitz"
import { Input } from "antd"
import Layout from "app/core/layouts/Layout"
const { Search } = Input

const Home = () => {
  const onSearch = (value) => console.log(value)

  return (
    <>
      <Search
        placeholder="搜索职位、公司"
        allowClear
        enterButton="搜索"
        size="large"
        onSearch={onSearch}
        style={{ width: 900 }}
      />
      <style jsx global>
        {``}
      </style>
    </>
  )
}

Home.suppressFirstRenderFlicker = true

Home.getLayout = (page) => <Layout title="人才招聘网站-首页">{page}</Layout>

export default Home

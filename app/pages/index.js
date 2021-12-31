import { Suspense } from "react"
import { Image, Link, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"

const Home = () => {
  return (
    <>
      <div>首页</div>
      <style jsx global>{``}</style>
    </>
  )
}

Home.suppressFirstRenderFlicker = true

Home.getLayout = (page) => <Layout title="人才招聘网站-首页">{page}</Layout>

export default Home

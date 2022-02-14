import { useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { Suspense } from "react"
import { LoadingOutlined } from "@ant-design/icons"
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const SignupPage = () => {
  const router = useRouter()
  return (
    <Suspense fallback={antIcon}>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </Suspense>
  )
}

SignupPage.redirectAuthenticatedTo = "/"

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage

import { useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { Suspense } from "react"

const SignupPage = () => {
  const router = useRouter()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </Suspense>
  )
}

SignupPage.redirectAuthenticatedTo = "/"

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage

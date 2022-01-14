import { Suspense } from "react"
import { useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"

const EditUserPage = () => {
  const router = useRouter()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm onSuccess={() => router.push(Routes.EditUserPage())} edit />
    </Suspense>
  )
}

// editUserPage.redirectAuthenticatedTo = "/"

EditUserPage.getLayout = (page) => <Layout title="editUser">{page}</Layout>

export default EditUserPage

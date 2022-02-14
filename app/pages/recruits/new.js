import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRecruit from "app/recruits/mutations/createRecruit"
import { RecruitForm, FORM_ERROR } from "app/recruits/components/RecruitForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Button } from "antd"

const NewRecruitPage = () => {
  const router = useRouter()
  const [createRecruitMutation] = useMutation(createRecruit)
  const currentUser = useCurrentUser()

  return (
    <div>
      <div style={{ fontSize: 35 }}>发布招聘信息</div>

      <RecruitForm
        initialValues={{
          userId: currentUser.id,
        }}
        submitText="发布"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRecruit}
        onSubmit={async (values) => {
          try {
            const recruit = await createRecruitMutation(values)
            router.push(
              Routes.ShowRecruitPage({
                recruitId: recruit.id,
              })
            )
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
      <Button type="primary" style={{ marginTop: 10 }}>
        <Link href={Routes.RecruitsPage()}>
          <a>返回招聘信息列表</a>
        </Link>
      </Button>
    </div>
  )
}

NewRecruitPage.authenticate = true

NewRecruitPage.getLayout = (page) => <Layout title={"Create New Recruit"}>{page}</Layout>

export default NewRecruitPage

import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecruit from "app/recruits/queries/getRecruit"
import updateRecruit from "app/recruits/mutations/updateRecruit"
import { RecruitForm, FORM_ERROR } from "app/recruits/components/RecruitForm"
import { LoadingOutlined } from "@ant-design/icons"
import { Button } from "antd"
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
export const EditRecruit = () => {
  const router = useRouter()
  const recruitId = useParam("recruitId", "number")
  const [recruit, { setQueryData }] = useQuery(
    getRecruit,
    {
      id: recruitId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateRecruitMutation] = useMutation(updateRecruit)
  return (
    <>
      <Head>
        <title>Edit Recruit {recruit.id}</title>
      </Head>

      <div>
        <h1>编辑招聘信息：{recruit.id}</h1>

        <RecruitForm
          submitText="保存" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateRecruit}
          initialValues={recruit}
          onSubmit={async (values) => {
            try {
              const updated = await updateRecruitMutation({
                id: recruit.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowRecruitPage({
                  recruitId: updated.id,
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
      </div>
    </>
  )
}

const EditRecruitPage = () => {
  return (
    <div>
      <Suspense fallback={antIcon}>
        <EditRecruit />
      </Suspense>

      <Button type="primary" style={{ marginTop: 10 }}>
        <Link href={Routes.RecruitsPage()}>
          <a>返回招聘信息列表</a>
        </Link>
      </Button>
    </div>
  )
}

EditRecruitPage.authenticate = true

EditRecruitPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRecruitPage

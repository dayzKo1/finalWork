import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRecruit from "app/recruits/mutations/createRecruit"
import { RecruitForm, FORM_ERROR } from "app/recruits/components/RecruitForm"

const NewRecruitPage = () => {
  const router = useRouter()
  const [createRecruitMutation] = useMutation(createRecruit)
  return (
    <div>
      <h1>Create New Recruit</h1>

      <RecruitForm
        submitText="Create Recruit" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRecruit}
        // initialValues={{}}
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

      <p>
        <Link href={Routes.RecruitsPage()}>
          <a>Recruits</a>
        </Link>
      </p>
    </div>
  )
}

NewRecruitPage.authenticate = true

NewRecruitPage.getLayout = (page) => <Layout title={"Create New Recruit"}>{page}</Layout>

export default NewRecruitPage

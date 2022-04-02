import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestion from "app/questions/queries/getQuestion"
import updateQuestion from "app/questions/mutations/updateQuestion"
import { QuestionForm, FORM_ERROR } from "app/questions/components/QuestionForm"
import { LoadingOutlined } from "@ant-design/icons"
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />
export const EditQuestion = () => {
  const router = useRouter()
  const questionId = useParam("questionId", "number")
  const [question, { setQueryData }] = useQuery(
    getQuestion,
    {
      id: questionId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateQuestionMutation] = useMutation(updateQuestion)
  return (
    <>
      <Head>
        <title>Edit Question {question.id}</title>
      </Head>

      <div>
        <h1>编辑问题:{question.id}</h1>

        <QuestionForm
          submitText="保存" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateQuestion}
          initialValues={question}
          onSubmit={async (values) => {
            try {
              const updated = await updateQuestionMutation({
                id: question.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowQuestionPage({
                  questionId: updated.id,
                })
              )
            } catch (error) {
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

const EditQuestionPage = () => {
  return (
    <div>
      <Suspense fallback={antIcon}>
        <EditQuestion />
      </Suspense>

      <p>
        <Link href={Routes.QuestionsPage()}>
          <a>返回问题列表</a>
        </Link>
      </p>
    </div>
  )
}

EditQuestionPage.authenticate = true

EditQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditQuestionPage

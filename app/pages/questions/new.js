import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createQuestion from "app/questions/mutations/createQuestion"
import { QuestionForm, FORM_ERROR } from "app/questions/components/QuestionForm"

const NewQuestionPage = () => {
  const router = useRouter()
  const [createQuestionMutation] = useMutation(createQuestion)
  return (
    <div>
      <h1>创建新问题</h1>

      <QuestionForm
        submitText="保存"
        initialValues={{ choices: [] }}
        onSubmit={async (values) => {
          try {
            const question = await createQuestionMutation(values)
            router.push(
              Routes.ShowQuestionPage({
                questionId: question.id,
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
        <Link href={Routes.QuestionsPage()}>
          <a>返回问题列表</a>
        </Link>
      </p>
    </div>
  )
}

NewQuestionPage.authenticate = true

NewQuestionPage.getLayout = (page) => <Layout title={"Create New Question"}>{page}</Layout>

export default NewQuestionPage

import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestion from "app/questions/queries/getQuestion"
import deleteQuestion from "app/questions/mutations/deleteQuestion"
import updateChoice from "app/choices/mutations/updateChoice"
import { LoadingOutlined } from "@ant-design/icons"
import { Button } from "antd"
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export const Question = () => {
  const router = useRouter()
  const questionId = useParam("questionId", "number")
  const [deleteQuestionMutation] = useMutation(deleteQuestion)
  const [question, { refetch }] = useQuery(getQuestion, {
    id: questionId,
  })
  const [updateChoiceMutation] = useMutation(updateChoice)

  const handleVote = async (id) => {
    try {
      await updateChoiceMutation({ id })
      refetch()
    } catch (error) {
      alert("Error updating choice " + JSON.stringify(error, null, 2))
    }
  }

  return (
    <>
      <Head>
        <title>Question {question.id}</title>
      </Head>

      <div>
        <h1>{question.text}</h1>

        <ul>
          {question.choices.map((choice) => (
            <li key={choice.id}>
              {choice.text} - {choice.votes} 票
              <Button
                shape="circle"
                size="small"
                style={{ margin: "0.5rem" }}
                onClick={() => handleVote(choice.id)}
              >
                +1
              </Button>
            </li>
          ))}
        </ul>
        <Button type="primary">
          <Link href={`/questions/${question.id}/edit`}>
            <a>编辑</a>
          </Link>
        </Button>
        <Button
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteQuestionMutation({ id: question.id })
              router.push("/questions")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          删除
        </Button>
      </div>
    </>
  )
}

const ShowQuestionPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.QuestionsPage()}>
          <a>Questions</a>
        </Link>
      </p>

      <Suspense fallback={antIcon}>
        <Question />
      </Suspense>
    </div>
  )
}

ShowQuestionPage.authenticate = false

ShowQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowQuestionPage

import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestion from "app/questions/queries/getQuestion"
import deleteQuestion from "app/questions/mutations/deleteQuestion"
import updateChoice from "app/choices/mutations/updateChoice"
import { LoadingOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons"
import { Button, Progress, Space, Card } from "antd"
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />

export const Question = () => {
  const router = useRouter()
  const questionId = useParam("questionId", "number")
  const [deleteQuestionMutation] = useMutation(deleteQuestion)
  const [question, { refetch }] = useQuery(getQuestion, {
    id: questionId,
  })
  const [updateChoiceMutation] = useMutation(updateChoice)
  const [click, setClick] = useState(false)

  const handleVote = async (id) => {
    try {
      await updateChoiceMutation({ id })
      refetch()
      setClick(true)
    } catch (error) {
      alert("Error updating choice " + JSON.stringify(error, null, 2))
    }
  }
  let sum = 0
  question.choices.forEach((item) => {
    sum += item.votes
  })

  return (
    <>
      <Head>
        <title>Question {question.id}</title>
      </Head>

      <div>
        <Card>
          <h1>{question.text}</h1>
          {question.choices.map((choice) => (
            <div key={choice.id} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  padding: 10,
                  width: 200,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {choice.text}
              </div>
              <div style={{ padding: 10, width: 50 }}>{choice.votes}</div>
              <div style={{ width: 200 }}>
                <Progress
                  percent={
                    isNaN(((choice.votes * 100) / sum).toFixed(2))
                      ? 0
                      : ((choice.votes * 100) / sum).toFixed(2)
                  }
                  size="small"
                  strokeColor={{
                    from: "#108ee9",
                    to: "#87d068",
                  }}
                />
              </div>
              <Button
                shape="circle"
                size="small"
                style={{ marginLeft: 30 }}
                onClick={() => handleVote(choice.id)}
                disabled={click}
                type="text"
              >
                {click ? <LikeFilled /> : <LikeOutlined />}
              </Button>
            </div>
          ))}
        </Card>
        <div style={{ cssFloat: "right" }}>
          <Button type="primary" style={{ margin: 10 }}>
            <Link href={`/questions/${question.id}/edit`}>
              <a>编辑</a>
            </Link>
          </Button>
          <Button
            style={{ margin: 10 }}
            onClick={async () => {
              if (window.confirm("确认删除?")) {
                await deleteQuestionMutation({ id: question.id })
                router.push("/questions")
              }
            }}
          >
            删除
          </Button>
        </div>
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

import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestions from "app/questions/queries/getQuestions"
import { Button } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const ITEMS_PER_PAGE = 100
export const QuestionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ questions, hasMore }] = usePaginatedQuery(getQuestions, {
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    })

  return (
    <div>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <Link
              href={Routes.ShowQuestionPage({
                questionId: question.id,
              })}
            >
              <a>{question.text}</a>
            </Link>
            <ul>
              {question.choices.map((choice) => (
                <li key={choice.id}>
                  {choice.text} - {choice.votes} votes
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button> */}
    </div>
  )
}

const QuestionsPage = () => {
  return (
    <>
      <Head>
        <title>Questions</title>
      </Head>

      <div>
        <Button type="primary" style={{ marginTop: 10 }}>
          <Link href={Routes.NewQuestionPage()}>
            <a>创建问答</a>
          </Link>
        </Button>

        <Suspense fallback={antIcon}>
          <QuestionsList />
        </Suspense>
      </div>
    </>
  )
}

QuestionsPage.authenticate = true

QuestionsPage.getLayout = (page) => <Layout title="Questions">{page}</Layout>

export default QuestionsPage

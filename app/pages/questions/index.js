import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestions from "app/questions/queries/getQuestions"
import { Button, List, Divider, Card } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />

const ITEMS_PER_PAGE = 10

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
    <Card style={{ width: 1200, marginTop: 10 }}>
      <List
        size="large"
        // bordered
        dataSource={questions}
        renderItem={(item) => (
          <List.Item>
            <Link
              href={Routes.ShowQuestionPage({
                questionId: item.id,
              })}
            >
              <a>{item.text}</a>
            </Link>
          </List.Item>
        )}
      />

      <Button type="primary" style={{ marginTop: 10, cssFloat: "right" }}>
        <Link href={Routes.NewQuestionPage()}>
          <a>创建问题</a>
        </Link>
      </Button>
    </Card>
  )
}

const QuestionsPage = () => {
  return (
    <>
      <Head>
        <title>Questions</title>
      </Head>

      <div>
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

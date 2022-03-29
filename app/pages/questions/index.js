import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestions from "app/questions/queries/getQuestions"
import { Button, List, Divider, Card } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { getDate } from "../util/utils"

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />

const ITEMS_PER_PAGE = 4

export const QuestionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ questions, hasMore, count }] = usePaginatedQuery(getQuestions, {
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

  const totalVotes = (data) => {
    return data.reduce((total, num) => {
      return total + num.votes
    }, 0)
  }

  return (
    <Card
      style={{
        width: 1200,
        marginTop: 10,
      }}
    >
      <List
        size="large"
        // bordered
        dataSource={questions}
        renderItem={(item) => (
          <List.Item>
            <div>
              <div style={{ width: "100%", fontSize: 18 }}>
                <Link
                  href={Routes.ShowQuestionPage({
                    questionId: item.id,
                  })}
                >
                  {item.text}
                </Link>
              </div>
              <div>
                <div>创建于: {getDate(item.createdAt)}</div>
                <div>更新于: {getDate(item.updatedAt)}</div>
                <div>总票数：{totalVotes(item.choices)}</div>
              </div>
            </div>
          </List.Item>
        )}
      />
      <div
        style={{ margin: 10, display: "flex", justifyContent: "flex-end", alignItems: "center" }}
      >
        <div style={{ marginRight: 10 }}>
          第 {page + 1} / {Math.ceil(count / ITEMS_PER_PAGE)} 页 共 {count} 项
        </div>
        <Button onClick={goToPreviousPage} style={{ marginRight: 10 }} disabled={page === 0}>
          上一页
        </Button>

        <Button
          onClick={goToNextPage}
          style={{ marginRight: 10 }}
          disabled={page + 1 === Math.ceil(count / ITEMS_PER_PAGE)}
        >
          下一页
        </Button>

        <Button type="primary">
          <Link href={Routes.NewQuestionPage()}>
            <a>创建问题</a>
          </Link>
        </Button>
      </div>
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

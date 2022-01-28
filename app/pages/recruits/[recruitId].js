import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecruit from "app/recruits/queries/getRecruit"
import deleteRecruit from "app/recruits/mutations/deleteRecruit"
import { Descriptions } from "antd"
export const Recruit = () => {
  const router = useRouter()
  const recruitId = useParam("recruitId", "number")
  const [deleteRecruitMutation] = useMutation(deleteRecruit)
  const [recruit] = useQuery(getRecruit, {
    id: recruitId,
  })
  return (
    <>
      <Head>
        <title>Recruit {recruit.id}</title>
      </Head>

      <div>
        <div> 岗位名称：{recruit.name} </div>

        <Descriptions title="岗位介绍">
          <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
          <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="Remark">empty</Descriptions.Item>
          <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>

        <Link
          href={Routes.EditRecruitPage({
            recruitId: recruit.id,
          })}
        >
          <a>编辑</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRecruitMutation({
                id: recruit.id,
              })
              router.push(Routes.RecruitsPage())
            }
          }}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          删除
        </button>
      </div>
    </>
  )
}

const ShowRecruitPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.RecruitsPage()}>
          <a>招聘信息列表</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Recruit />
      </Suspense>
    </div>
  )
}

ShowRecruitPage.authenticate = true

ShowRecruitPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRecruitPage

import { Suspense } from "react"
import { Head, useRouter, Image, useMutation, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoadingOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Box } from "@chakra-ui/react"
import { Avatar, Divider, message } from "antd"
import { Form, FORM_ERROR } from "app/core/components/Form"
import InputControl from "app/core/components/InputControl"
import NoteControl from "app/core/components/NoteControl"
import updateResume from "app/resumes/mutations/updateResume"
import createResume from "app/resumes/mutations/createResume"
import getResume from "app/resumes/queries/getResume"

import UploadImage from "app/pages/components/UploadImage"

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />

export const ResumeList = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const { id: userId } = currentUser
  const [createResumeMutation] = useMutation(createResume)
  const [updateResumeMutation] = useMutation(updateResume)
  const isExist = currentUser.Resume.length > 0
  console.log(isExist)
  return (
    <>
      <Box
        as="form"
        p={10}
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        bg="#fdeff0"
        borderRadius="6px"
        my="80px"
        w={1200}
      >
        <Form
          submitText="保存"
          // schema={props.edit ? editUser : Signup}
          initialValues={{
            gender: isExist ? currentUser.Resume[0].gender : "",
            age: isExist ? currentUser.Resume[0].age : "",
            status: isExist ? currentUser.Resume[0].status : "",
            prefer: isExist ? currentUser.Resume[0].prefer : "",
            advance: isExist ? currentUser.Resume[0].advance : "",
            educ: isExist ? currentUser.Resume[0].educ : "",
            inte: isExist ? currentUser.Resume[0].inte : "",
            proj: isExist ? currentUser.Resume[0].proj : "",
            stud: isExist ? currentUser.Resume[0].stud : "",
            lang: isExist ? currentUser.Resume[0].lang : "",
            skil: isExist ? currentUser.Resume[0].skil : "",
            cert: isExist ? currentUser.Resume[0].cert : "",
          }}
          onSubmit={async (values) => {
            try {
              if (!isExist) {
                await createResumeMutation({
                  userId: currentUser.id,
                  ...values,
                })
              } else {
                await updateResumeMutation({
                  id: currentUser.Resume[0].id,
                  ...values,
                })
              }
              message.success("修改成功")
              // props.onSuccess?.()
            } catch (error) {
              // if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              //   // This error comes from Prisma
              //   return {
              //     email: "该邮箱已被使用",
              //   }
              // } else {
              // return {
              //   [FORM_ERROR]: error.toString(),
              // }
              // }
            }
          }}
        >
          <Box d="flex">
            <Box p={24}>
              {/* <UploadImage /> */}
              <Avatar icon={<UserOutlined />} />
              <InputControl name="gender" label="邮箱" />
              <InputControl name="age" label="年龄" />
              <InputControl name="number" label="电话" />
              <InputControl name="status" label="求职状态" />
              <InputControl name="prefer" label="求职意向" />
            </Box>

            <Box p={24}>
              <NoteControl name="advance" label="个人优势/作品" />
              <NoteControl name="educ" label="教育经历" />
              <NoteControl name="inte" label="工作/实习经历" />
              <NoteControl name="proj" label="项目经历" />
            </Box>
            <Box p={24}>
              <NoteControl name="stud" label="学生干部经历" />
              <NoteControl name="lang" label="语言能力" />
              <NoteControl name="skil" label="专业技能" />
              <NoteControl name="cert" label="证书" />
            </Box>
          </Box>
        </Form>
      </Box>
      <style jsx>
        {`
          :global(.ant-card-body) {
            padding: 0 !important;
          }

          :global(.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap) {
            margin-bottom: 10px;
          }

          :global(.ant-tabs-tab:hover) {
            color: white;
          }

          :global(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
            color: white;
          }

          :global(.ant-card-head) {
            border-bottom: none;
          }

          :global(.ant-card-bordered) {
            border: none;
          }

          :global(.ant-card) {
            border-radius: 0;
          }
        `}
      </style>
    </>
  )
}

const ResumePage = () => {
  return (
    <>
      <Head>
        <title>Resume</title>
      </Head>
      <Suspense fallback={antIcon}>
        <ResumeList />
      </Suspense>
    </>
  )
}

ResumePage.authenticate = true

ResumePage.getLayout = (page) => <Layout>{page}</Layout>

export default ResumePage

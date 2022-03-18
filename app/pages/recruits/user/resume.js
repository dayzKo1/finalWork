import { Suspense, useState } from "react"
import { Head, Link, useRouter, Routes, Image, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Router } from "next/dist/client/router"
import { Box, Avatar } from "@chakra-ui/react"
import { Upload, message } from "antd"
import { Form, FORM_ERROR } from "app/core/components/Form"
import InputControl from "app/core/components/InputControl"

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />

const UploadAvator = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!")
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  }

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      // customRequest={customRequest}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Image width={400} height={300} src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  )
}

export const ResumeList = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()

  return (
    <>
      <Form
        submitText="保存"
        // schema={props.edit ? editUser : Signup}
        // initialValues={{
        //   email: props.edit ? currentUser?.email : "",
        //   password: "",
        //   role: props.edit ? currentUser?.role : "USER",
        //   name: props.edit ? currentUser?.name : "",
        //   companyKind: props.edit ? currentUser?.companyKind : "",
        //   companySize: props.edit ? currentUser?.companySize : "",
        // }}
        onSubmit={async (values) => {
          try {
            if (props.edit) {
              await editUserMutation(values)
              message.success("修改成功")
            } else {
              await signupMutation(values)
            }
            props.onSuccess?.()
          } catch (error) {
            // if (error.code === "P2002" && error.meta?.target?.includes("email")) {
            //   // This error comes from Prisma
            //   return {
            //     email: "该邮箱已被使用",
            //   }
            // } else {
            //   return {
            //     [FORM_ERROR]: error.toString(),
            //   }
            // }
          }
        }}
      >
        <Box
          as="form"
          p={10}
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          alignItems="center"
          bg="#fdeff0"
          borderRadius="6px"
          d="flex"
          my="80px"
          w={1200}
        >
          <Box p={24}>
            <UploadAvator />

            <InputControl name="性别" label="邮箱" />

            <InputControl name="年龄" label="年龄" />

            <InputControl name="求职状态" label="求职状态" />

            <InputControl name="求职意向" label="求职意向" />

            <InputControl name="个人优势" label="个人优势" />

            <InputControl name="个人作品" label="个人作品" />
          </Box>

          <Box p={24}>
            <InputControl name="教育经历" label="教育经历" />

            <InputControl name="工作/实习经历" label="工作/实习经历" />

            <InputControl name="项目经历" label="项目经历" />

            <InputControl name="学生干部经历" label="学生干部经历" />

            <InputControl name="语言能力" label="语言能力" />

            <InputControl name="专业技能" label="专业技能" />

            <InputControl name="证书" label="证书" />
          </Box>
        </Box>
      </Form>

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

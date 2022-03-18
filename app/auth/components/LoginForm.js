import React, { useRef, useState } from "react"
import { AuthenticationError, Link, useMutation, Routes, Image } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import Layout from "app/core/layouts/Layout"
import { Field, useField, useForm } from "react-final-form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Box, Heading, FormErrorMessage, useToast, createStandaloneToast } from "@chakra-ui/react"
import InputControl from "app/core/components/InputControl"
import ValidateCode from "./ValidateCode"

export const LoginForm = (props) => {
  const [loginMutation] = useMutation(login)
  const canvasRef = useRef(null)
  const [code, setCode] = useState("")
  const toast = createStandaloneToast()
  const id = "unAuthenticated"
  return (
    <Box transform="scale(1.2)">
      {props.unAuthenticated &&
        !toast.isActive(id) &&
        toast({
          id,
          title: "请先登录",
          status: "info",
          duration: 6000,
          containerStyle: {
            marginBottom: 10,
          },
        })}
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
      >
        <Form
          submitText="登录"
          schema={Login}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            if (values?.code?.toLowerCase() !== code.toLowerCase()) {
              return {
                [FORM_ERROR]: "验证码错误",
              }
            }
            try {
              const user = await loginMutation(values)
              props.onSuccess?.(user)
            } catch (error) {
              if (error instanceof AuthenticationError) {
                return {
                  [FORM_ERROR]: "邮箱或密码错误",
                }
              } else {
                return {
                  [FORM_ERROR]: "抱歉，我们遇到了意外错误。请重试。-" + error.toString(),
                }
              }
            }
          }}
        >
          <InputControl name="email" label="邮箱" />

          <InputControl name="password" label="密码" type="password" eye />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: -30,
              marginBottom: -10,
            }}
          >
            <InputControl name="code" label="验证码" width={170} />

            <div style={{ paddingTop: 50, paddingRight: 10 }}>
              <ValidateCode canvasRef={canvasRef} setCode={setCode} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link href={Routes.SignupPage()}>注册账号</Link>
            <Link href={Routes.ForgotPasswordPage()}>
              <div style={{ color: "grey", cursor: "pointer" }}>忘记密码?</div>
            </Link>
          </div>
        </Form>
      </Box>
    </Box>
  )
}

LoginForm.authenticate = false

LoginForm.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginForm

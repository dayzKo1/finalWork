import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import Layout from "app/core/layouts/Layout"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
export const LoginForm = (props) => {
  const [loginMutation] = useMutation(login)
  return (
    <div>
      <h1>登录</h1>

      <Form
        submitText="确认"
        schema={Login}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return {
                [FORM_ERROR]: "Sorry, those credentials are invalid",
              }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a>忘记密码?</a>
          </Link>
          &nbsp;Or&nbsp;
          <Link href={Routes.SignupPage()}>注册</Link>
        </div>
      </Form>
    </div>
  )
}

LoginForm.authenticate = false

LoginForm.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginForm

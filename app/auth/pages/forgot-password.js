import { useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"

const ForgotPasswordPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)
  return (
    <div>
      <h1>忘记密码?</h1>

      {isSuccess ? (
        <div>
          <h2>请求已发送</h2>
          <p>如果该邮箱存在，将打开新页面修改密码。</p>
        </div>
      ) : (
        <Form
          submitText="发送重置请求"
          schema={ForgotPassword}
          initialValues={{
            email: "",
          }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values)
            } catch (error) {
              return {
                [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
        </Form>
      )}
    </div>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"

ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage

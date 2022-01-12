import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
export const SignupForm = (props) => {
  const [signupMutation] = useMutation(signup)
  return (
    <div>
      <h1>创建账号</h1>

      <Form
        submitText="确认"
        schema={Signup}
        initialValues={{
          email: "",
          password: "",
          role: "",
          name: "",
        }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return {
                email: "该邮箱已被使用",
              }
            } else {
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="Name" placeholder="Name" />
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="role" label="Role" placeholder="Role" type="Role" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}
export default SignupForm

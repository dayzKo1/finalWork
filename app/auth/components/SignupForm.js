import { useMutation, Routes, Link, useRouter } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import edituser from "app/auth/mutations/editUser"
import { Signup, editUser } from "app/auth/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { message } from "antd"
import { Field } from "react-final-form"
export const SignupForm = (props) => {
  const [signupMutation] = useMutation(signup)
  const [editUserMutation] = useMutation(edituser)
  const currentUser = useCurrentUser()
  const router = useRouter()
  return (
    <div>
      <h1>{props.edit ? "修改个人信息" : "创建账号"}</h1>
      <Form
        submitText="确认"
        schema={props.edit ? editUser : Signup}
        initialValues={{
          email: props.edit ? currentUser?.email : "",
          password: "",
          role: props.edit ? currentUser?.role : "USER",
          name: props.edit ? currentUser?.name : "",
        }}
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
        {props.edit ? (
          <div>
            <Link href={Routes.ForgotPasswordPage()}>
              <a>重置密码</a>
            </Link>
          </div>
        ) : (
          <div>
            <label>
              Role
              <Field
                name="role"
                component="select"
                style={{
                  fontSize: "1rem",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "3px",
                  border: "1px solid purple",
                  appearance: "none",
                  marginTop: "0.5rem",
                  marginBottom: " 0.5rem",
                  width: "100%",
                }}
              >
                <option value="USER">User</option>
                <option value="COMPANY">Company</option>
              </Field>
            </label>
            <LabeledTextField
              name="password"
              label="Password"
              placeholder="password"
              type="password"
            />
          </div>
        )}
      </Form>

      <style jsx>{`
        label {
          display: flex;
          flex-direction: column;
          align-items: start;
          font-size: 1rem;
        }
      `}</style>
    </div>
  )
}
export default SignupForm

import { useMutation, Routes, Link, useRouter } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import edituser from "app/auth/mutations/editUser"
import { Signup, editUser } from "app/auth/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { message } from "antd"
import { Field, useField } from "react-final-form"

const style = {
  fontSize: "1rem",
  padding: "0.25rem 0.5rem",
  borderRadius: "3px",
  border: "1px solid purple",
  appearance: "none",
  marginTop: "0.5rem",
  marginBottom: " 0.5rem",
  width: "100%",
}
export const SignupForm = (props) => {
  const [signupMutation] = useMutation(signup)
  const [editUserMutation] = useMutation(edituser)
  const currentUser = useCurrentUser()
  const router = useRouter()

  const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  )

  const kinds = [
    "不限",
    "国企",
    "外企",
    "合资",
    "民营",
    "上市公司",
    "股份制企业",
    "事业单位",
    "其他",
  ]
  const sizes = [
    "不限",
    "20人以下",
    "20-99人",
    "100-299人",
    "300-499人",
    "500-999人",
    "1000-9999人",
    "10000人以上",
  ]

  const renderOptions = (arr) =>
    arr &&
    arr.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      )
    })

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
          companyKind: props.edit ? currentUser?.companyKind : "",
          companySize: props.edit ? currentUser?.companySize : "",
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
        <Condition when="role" is="COMPANY">
          <label>公司性质</label>
          <Field name="companyKind" component="select" style={style}>
            {renderOptions(kinds)}
          </Field>
        </Condition>
        <Condition when="role" is="COMPANY">
          <label>公司规模</label>
          <Field name="companySize" component="select" style={style}>
            {renderOptions(sizes)}
          </Field>
        </Condition>

        {/* 重置密码 */}
        {props.edit ? (
          <div>
            <Link href={Routes.ForgotPasswordPage()}>
              <a>重置密码</a>
            </Link>
          </div>
        ) : (
          <div>
            <label>Role</label>
            <Field name="role" component="select" style={style}>
              <option value="USER">User</option>
              <option value="COMPANY">Company</option>
            </Field>
            <LabeledTextField
              name="password"
              label="Password"
              placeholder="Password"
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

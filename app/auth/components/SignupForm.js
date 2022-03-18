import { useMutation, Routes, Link, useRouter } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import edituser from "app/auth/mutations/editUser"
import { Signup, editUser } from "app/auth/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { message } from "antd"
import { Field, useField } from "react-final-form"
import InputControl from "app/core/components/InputControl"
import { Box, Heading } from "@chakra-ui/react"

const style = {
  fontSize: "1rem",
  padding: "0.25rem 0.5rem",
  borderRadius: "3px",
  border: "1px solid #e9e9e9",
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

  const kinds = ["国企", "外企", "合资", "民营", "上市公司", "股份制企业", "事业单位", "其他"]

  const sizes = [
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
    <Box transform="scale(1.2)">
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
          submitText={props.edit ? "确认" : "注册"}
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
          <InputControl name="name" label="姓名" />

          <InputControl name="email" label="邮箱" />

          {!props.edit && <InputControl name="password" label="密码" type="password" />}

          <div>
            <label>类型</label>
            <Field name="role" component="select" style={style}>
              <option value="USER">用户</option>
              <option value="COMPANY">企业</option>
            </Field>
          </div>

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
        </Form>

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-weight: 600;
            font-size: 16px;
            color: grey;
          }
        `}</style>
      </Box>
    </Box>
  )
}
export default SignupForm

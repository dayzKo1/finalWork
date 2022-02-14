import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
export function RecruitForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="name" label="岗位名称" placeholder="岗位名称" />
      <LabeledTextField name="salary" label="薪酬" placeholder="薪酬" />
      <LabeledTextField name="description" label="职位简介" placeholder="职位简介" />
      <LabeledTextField name="detail" label="职位描述" placeholder="职位描述" />
    </Form>
  )
}

import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
export function RecruitForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="name" label="岗位名称" placeholder="岗位名称" />
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <LabeledTextField
          name="salaryMin"
          label="薪酬"
          placeholder="最低薪酬"
          style={{ width: 100, marginRight: 10 }}
        />
        <LabeledTextField name="salaryMax" label="" placeholder="最高薪酬" style={{ width: 100 }} />
      </div>
      <LabeledTextField name="description" label="职位简介" placeholder="职位简介" />
      <LabeledTextField name="detail" label="职位描述" placeholder="职位描述" />
    </Form>
  )
}

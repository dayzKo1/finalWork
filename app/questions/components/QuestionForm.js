import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
export function QuestionForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="text" label="问题" placeholder="请输入问题" />
      <LabeledTextField name="choices.0.text" label="选项1" />
      <LabeledTextField name="choices.1.text" label="选项2" />
      <LabeledTextField name="choices.2.text" label="选项3" />
    </Form>
  )
}

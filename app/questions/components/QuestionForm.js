import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
export function QuestionForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="text" label="Text" placeholder="Text" />
      <LabeledTextField name="choices.0.text" label="Choice 1" />
      <LabeledTextField name="choices.1.text" label="Choice 2" />
      <LabeledTextField name="choices.2.text" label="Choice 3" />
    </Form>
  )
}

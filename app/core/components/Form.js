import { Form as FinalForm } from "react-final-form"
import { validateZodSchema } from "blitz"
import { Button } from "antd"
export { FORM_ERROR } from "final-form"
export function Form({ children, submitText, schema, initialValues, onSubmit, ...props }) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}

          {children}

          {submitError && (
            <div
              role="alert"
              style={{
                color: "red",
              }}
            >
              {submitError}
            </div>
          )}

          {submitText && (
            <Button
              style={{ width: "100%", borderRadius: 8 }}
              type="primary"
              onClick={() => form.submit()}
              disabled={submitting || pristine}
            >
              {submitText}
            </Button>
          )}

          {/* <Button
            onClick={() => form.reset()}
            disabled={submitting || pristine}
            style={{ marginLeft: "1rem" }}
          >
            重置
          </Button> */}

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    />
  )
}
export default Form

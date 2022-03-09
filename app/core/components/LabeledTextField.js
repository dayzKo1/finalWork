import { forwardRef } from "react"
import { useField } from "react-final-form"

export const LabeledTextField = forwardRef(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? Number // Converting `""` to `null` ensures empty values will be set to null in the DB
          : (v) => (v === "" ? null : v),
      ...fieldProps,
    })
    const normalizedError = Array.isArray(error)
      ? error.join(", ")
      : error
          ?.replace("Invalid email", "无效邮箱")
          .replace("Should be at least 8 characters", "密码不能少于八位")
          .replace("Expected string, received null", "请输入字符") || submitError
    return (
      <div {...outerProps}>
        <label {...labelProps}>
          {label}
          <input {...input} disabled={submitting} {...props} ref={ref} />
        </label>

        {touched && normalizedError && (
          <div
            role="alert"
            style={{
              color: "red",
            }}
          >
            {normalizedError}
          </div>
        )}

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-weight: 600;
            font-size:16px;
            color: grey;
          }
          input {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            border: '1px solid #e9e9e9',
            appearance: none;
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
)
export default LabeledTextField

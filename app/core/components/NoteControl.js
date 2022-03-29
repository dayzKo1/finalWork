import React, { useState } from "react"
import { Field, useField, useForm } from "react-final-form"
import { Box, Heading, FormControl, FormLabel, FormErrorMessage, Textarea } from "@chakra-ui/react"

const Error = ({ name }) => {
  const {
    meta: { error },
  } = useField(name, { subscription: { error: true } })
  return (
    <FormErrorMessage pl={6} color="red">
      {error
        ?.replace("Required", `${name}不能为空`)
        ?.replace("Invalid email", "无效邮箱")
        ?.replace("Should be at least 8 characters", "密码不能少于八位")
        ?.replace("Expected string, received null", "请输入字符")}
    </FormErrorMessage>
  )
}

const AdaptedTextarea = ({ input, meta, ...rest }) => (
  <Textarea
    w={350}
    h={240}
    borderRadius={4}
    p={12}
    fontSize={16}
    border="1px solid #e9e9e9"
    {...input}
    {...rest}
    isInvalid={meta.error && meta.touched}
  />
)

const Control = ({ name, ...rest }) => {
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } })
  return <FormControl {...rest} isInvalid={error && touched} />
}

const NoteControl = ({ name, label }) => (
  <Control name={name} my={4}>
    <FormLabel htmlFor={name} pb={8} fontWeight={600} fontSize={16} color="grey">
      {" "}
      {label}
    </FormLabel>
    <Field name={name} component={AdaptedTextarea} placeholder={label} id={name} />
    <Error name={name} />
  </Control>
)

export default NoteControl

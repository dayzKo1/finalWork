import React, { useState } from "react"
import { Field, useField, useForm } from "react-final-form"
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightElement,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

const Control = ({ name, ...rest }) => {
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } })
  return <FormControl {...rest} isInvalid={error && touched} />
}

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

const InputControl = ({ name, label, width, type, eye }) => {
  const { input, meta } = useField(name)
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Control name={name} my={30} w={width ?? 350} h={60}>
      <FormLabel htmlFor={name} pb={8} fontWeight={600} fontSize={16} color="grey">
        {" "}
        {label}
      </FormLabel>
      <Input
        {...input}
        type={
          (type === "password" && show === true && "text") ||
          (type === "password" && show === false && "password") ||
          (type === "text" && "text")
        }
        w="100%"
        h={36}
        isInvalid={meta.error && meta.touched}
        id={name}
        placeholder={label}
        border="1px solid #e9e9e9"
        borderRadius={8}
        pl={8}
      />
      <InputRightElement>
        {type === "password" && eye && (
          <div
            onClick={handleClick}
            style={{ paddingTop: 170, paddingRight: 25, color: "#40a9ff" }}
          >
            {!show ? <ViewIcon /> : <ViewOffIcon />}
          </div>
        )}
      </InputRightElement>
      <div>
        <Error name={name} />
      </div>
    </Control>
  )
}

export default InputControl

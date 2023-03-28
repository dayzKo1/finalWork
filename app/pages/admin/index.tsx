import React, { Suspense, useState } from "react"
import { Head, usePaginatedQuery, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Form, Card, Table, Button, Space, Modal, message, Input, Select } from "antd"
import deleteUser from "app/auth/mutations/deleteUser"
import getusers from "app/auth/queries/getUsers"
import editAdmin from "app/auth/mutations/editAdmin"
import { FormInstance } from "antd/es/form"

const { Option } = Select

const Admin: BlitzPage = () => {
  const formRef = React.createRef<FormInstance>()
  const onChange = (value: any) => {
    switch (value) {
      case "USER":
        formRef.current!.setFieldsValue({ role: "USER" })
        return
      case "COMPANY":
        formRef.current!.setFieldsValue({ role: "COMPANY" })
        return
      case "ADMIN":
        formRef.current!.setFieldsValue({ role: "ADMIN" })
    }
  }

  const [editAdminMutation] = useMutation(editAdmin)

  const [{ users }, { refetch }] = usePaginatedQuery(getusers, {
    orderBy: {
      id: "asc",
    },
  })
  console.log(users, "users")
  const [deleteUserMutation] = useMutation(deleteUser)

  const [visible, setVisble] = useState(0)
  const onFinish = (values: any, id: any) => {
    editAdminMutation({ id, ...values })
    setVisble(0)
    message.success("保存成功")
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  const sizes = [
    "20人以下",
    "20-99人",
    "100-299人",
    "300-499人",
    "500-999人",
    "1000-9999人",
    "10000人以上",
  ]

  const kinds = ["国企", "外企", "合资", "民营", "上市公司", "股份制企业", "事业单位", "其他"]

  const renderOptions = (arr: any) =>
    arr &&
    arr.map((item: any, index: any) => {
      return (
        <Option key={index} value={item}>
          {item}
        </Option>
      )
    })
  const columns = [
    {
      key: "name",
      title: "用户名",
      dataIndex: "name",
    },
    {
      key: "email",
      title: "邮箱",
      dataIndex: "email",
    },
    // {
    //   key: "createdAt",
    //   title: "创建时间",
    //   dataIndex: "createdAt",
    // },
    // {
    //   key: "updatedAt",
    //   title: "最近修改",
    //   dataIndex: "updatedAt",
    // },
    {
      key: "role",
      title: "用户类型",
      dataIndex: "role",
    },
    // {
    //   key: "password",
    //   title: "密码",
    //   dataIndex: "hashedPassword",
    // },
    {
      title: "操作",
      key: "id",
      dataIndex: "id",
      render: (v: any, row: any) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setVisble(v)
            }}
          >
            编辑
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              deleteUserMutation({ id: v })
              refetch()
              message.success("删除成功")
            }}
          >
            删除
          </Button>
          <Modal
            visible={visible === v}
            onCancel={() => {
              setVisble(0)
              formRef.current!.resetFields()
            }}
            onOk={() => {}}
            okText="保存"
            cancelText="取消"
            footer={null}
          >
            <Form
              name="form"
              ref={formRef}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ paddingRight: 48, paddingBottom: 32, paddingTop: 32 }}
              initialValues={{
                id: row.id,
                name: row.name,
                email: row.email,
                password: "",
                role: row.role,
                companyIntro: row?.companyIntro,
                companyKind: row?.companyKind,
                companySize: row?.companySize,
              }}
              onFinish={(values) => onFinish(values, row.id)}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="用户名" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="邮箱" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="密码" name="password">
                <Input.Password />
              </Form.Item>
              <Form.Item label="账号类型" name="role">
                <Select onChange={onChange}>
                  <Option key="USER" value="USER">
                    求职者
                  </Option>
                  <Option key="COMPANY" value="COMPANY">
                    招聘者
                  </Option>
                  <Option key="ADMIN" value="ADMIN">
                    管理员
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.gender !== currentValues.gender
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("role") === "COMPANY" ? (
                    <>
                      <Form.Item label="企业简介" name="companyIntro">
                        <Input />
                      </Form.Item>
                      <Form.Item label="企业类型" name="companyKind">
                        <Select>{renderOptions(kinds)}</Select>
                      </Form.Item>
                      <Form.Item label="企业规模" name="companySize">
                        <Select>{renderOptions(sizes)}</Select>
                      </Form.Item>
                    </>
                  ) : null
                }
              </Form.Item>
              <Form.Item style={{ display: "flex", justifyContent: "flex-end", marginBottom: -10 }}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      ),
    },
  ]
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>

      <Card style={{ marginTop: 20 }}>
        <Table dataSource={users} columns={columns} />
      </Card>

      <div>
        <Suspense fallback={<div>Loading...</div>}></Suspense>
      </div>
    </>
  )
}

Admin.authenticate = true

Admin.getLayout = (page) => <Layout title="Home">{page}</Layout>
export default Admin

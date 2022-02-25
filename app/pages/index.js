import { Image, Link, useMutation, Routes, useRouter } from "blitz"
import { Input, Affix, Cascader } from "antd"
import Layout from "app/core/layouts/Layout"
const { Search } = Input

const SearchHome = () => {
  const router = useRouter()
  const onSearch = (value) => {
    router.push(Routes.RecruitsPage({ search: value }))
  }
  return (
    <Affix offsetTop={100}>
      <Search
        placeholder="搜索职位、公司"
        allowClear
        enterButton="搜索"
        size="large"
        onSearch={onSearch}
        style={{ width: 1060 }}
      />
    </Affix>
  )
}

const CascaderHome = () => {
  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men",
            },
          ],
        },
      ],
    },
  ]

  function onChange(value) {
    console.log(value)
  }

  function displayRender(label) {
    return label[label.length - 1]
  }

  return (
    <Cascader
      style={{ marginTop: 200 }}
      options={options}
      expandTrigger="hover"
      displayRender={displayRender}
      onChange={onChange}
      open={true}
    />
  )
}

const Home = () => {
  return (
    <>
      <SearchHome />

      <style jsx global>
        {``}
      </style>
    </>
  )
}

Home.suppressFirstRenderFlicker = true

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home

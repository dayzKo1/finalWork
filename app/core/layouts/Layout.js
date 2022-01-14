import { Head, Image, Link, useMutation, Routes, useRouter } from "blitz"
import { Menu } from "antd"
import React, { useState, Suspense } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { MailOutlined, AppstoreOutlined, SettingOutlined, TrophyOutlined } from "@ant-design/icons"
import Footer from "rc-footer"
import "rc-footer/assets/index.css"

const UserInfo = (props) => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const { setCurrent } = props
  const router = useRouter()
  if (currentUser) {
    return (
      <>
        <div className="buttons2">
          <Link href={Routes.editUserPage()}>
            <a className="button small" onClick={() => setCurrent("0")}>
              个人中心
            </a>
          </Link>
          <a
            className="button small"
            onClick={async () => {
              await logoutMutation()
              router.push(Routes.LoginPage())
              setCurrent("0")
            }}
          >
            退出
          </a>
          用户名： {currentUser.name}({currentUser.role})
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="buttons">
          <Link href={Routes.SignupPage()}>
            <a className="button small" onClick={() => setCurrent("0")}>
              注册
            </a>
          </Link>
          <Link href={Routes.LoginPage()}>
            <a className="button small" onClick={() => setCurrent("0")}>
              登录
            </a>
          </Link>
        </div>
      </>
    )
  }
}
const Layout = ({ title, children }) => {
  const [current, setCurrent] = useState(title)
  const [theme, setTheme] = useState("dark")
  return (
    <>
      <div className="container">
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* 顶部菜单 */}
        <div style={{ width: "100%" }}>
          <Menu
            onClick={(e) => setCurrent(e.key)}
            selectedKeys={[current]}
            mode="horizontal"
            theme="dark"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Menu.Item key="Home" icon={<AppstoreOutlined />}>
              <Link href={Routes.Home()}>首页</Link>
            </Menu.Item>
            <Menu.Item key="Questions" icon={<MailOutlined />}>
              <Link href={Routes.QuestionsPage()}>问题</Link>
            </Menu.Item>
            <Menu.Item key="Home1" icon={<SettingOutlined />}>
              <Link href={Routes.Home()}>首页1</Link>
            </Menu.Item>
            <Menu.Item key="Home2" icon={<TrophyOutlined />}>
              <Link href={Routes.Home()}>首页2</Link>
            </Menu.Item>
            <Suspense fallback="Loading...">
              <UserInfo setCurrent={setCurrent} />
            </Suspense>
          </Menu>
        </div>
        {/* 主体 */}
        <main>{children}</main>
        <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap"); */}
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main p {
          font-size: 1.2rem;
        }
        p {
          text-align: center;
        }
        .logo {
          margin-bottom: 2rem;
        }
        .logo img {
          width: 300px;
        }
        .buttons {
          order: 4;
          margin-left:30rem;
        }
        .buttons2 {
          order: 4;
          margin-left:25rem;
        }
        .button {
          font-size: 0.8rem;
          padding: 1rem 2rem;
          text-align: center;
        }
        .button.small {
          color:hsla(0,0%,100%,.65);
          padding: 0rem 1rem;
        }
        .button:hover {
          color: #1890ff;
        }
        pre {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          text-align: center;
        }
        code {
          font-size: 0.9rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
      </div>
      {/* 页脚 */}
      <Footer
        maxColumnsPerRow={4}
        theme={theme}
        columns={[
          {
            title: "相关资源",
            items: [
              {
                title: "Ant Design Pro",
                url: "https://pro.ant.design/",
                openExternal: true,
              },
              {
                title: "Ant Design Mobile",
                url: "https://mobile.ant.design/",
                openExternal: true,
              },
              {
                title: "Kitchen",
                url: "https://kitchen.alipay.com/",
                description: "Sketch 工具集",
              },
            ],
          },
          {
            title: "社区",
            items: [
              {
                title: "Ant Design Pro",
                url: "https://pro.ant.design/",
                openExternal: true,
              },
              {
                title: "Ant Design Mobile",
                url: "https://mobile.ant.design/",
                openExternal: true,
              },
              {
                title: "Kitchen",
                url: "https://kitchen.alipay.com/",
                description: "Sketch 工具集",
              },
            ],
          },
          {
            title: "帮助",
            items: [
              {
                title: "Ant Design Pro",
                url: "https://pro.ant.design/",
                openExternal: true,
              },
              {
                title: "Ant Design Mobile",
                url: "https://mobile.ant.design/",
                openExternal: true,
              },
              {
                title: "Kitchen",
                url: "https://kitchen.alipay.com/",
                description: "Sketch 工具集",
              },
            ],
          },
          {
            icon: (
              <Image
                src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
                alt="more products"
              />
            ),
            title: "更多产品",
            items: [
              {
                icon: (
                  <Image
                    src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
                    alt="yuque"
                  />
                ),
                title: "语雀",
                url: "https://yuque.com",
                description: "知识创作与分享工具",
                openExternal: true,
              },
              {
                icon: (
                  <Image
                    src="https://gw.alipayobjects.com/zos/rmsportal/uHocHZfNWZOdsRUonZNr.png"
                    alt="yuque"
                  />
                ),
                title: "云凤蝶",
                url: "https://yunfengdie.com",
                description: "中台建站平台",
                openExternal: true,
              },
            ],
          },
        ]}
        bottom="&copy;dayzKo1"
      />
    </>
  )
}

export default Layout

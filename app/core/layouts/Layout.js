import { Head, Image, Link, useMutation, Routes, useRouter } from "blitz"
import { Menu, Dropdown, Affix, BackTop, Button } from "antd"
import React, { useState, Suspense } from "react"
import { useLayoutEffect } from "react-layout-effect"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  TrophyOutlined,
  LoadingOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  ReconciliationOutlined,
  HighlightOutlined,
  UpOutlined,
} from "@ant-design/icons"
import Footer from "rc-footer"
import "rc-footer/assets/index.css"
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />

const menu = (currentUser, setCurrent, type) => (
  <Menu style={{ width: type === "side" && 60 }}>
    <Menu.Item>
      <Link href={Routes.EditUserPage()}>
        <div onClick={() => setCurrent("0")}>个人信息</div>
      </Link>
    </Menu.Item>

    {currentUser?.role === "COMPANY" && (
      <>
        <Menu.Item>
          <Link href={Routes.AppliesPage()}>
            <div onClick={() => setCurrent("0")}>我的职位</div>
          </Link>
        </Menu.Item>
      </>
    )}

    {currentUser?.role === "USER" && (
      <>
        <Menu.Item>
          <Link href={Routes.CollectsPage()}>
            <div onClick={() => setCurrent("0")}>我的收藏</div>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={Routes.MyAppliesPage()}>
            <div onClick={() => setCurrent("0")}>我的申请</div>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={Routes.ResumePage()}>
            <div onClick={() => setCurrent("0")}>我的简历</div>
          </Link>
        </Menu.Item>
      </>
    )}
  </Menu>
)

const UserInfo = (props) => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const { setCurrent } = props
  const router = useRouter()
  if (currentUser) {
    return (
      <>
        <div className="buttons2">
          <Dropdown overlay={menu(currentUser, setCurrent)}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              style={{ color: "hsla(0,0%,100%,.65)" }}
            >
              个人中心
            </a>
          </Dropdown>
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
          用户名：
          <div
            title={`${currentUser.name}(${currentUser?.role})}`}
            style={{
              textOverflow: "ellipsis",
              width: 100,
              position: "absolute",
              overflow: "hidden",
              top: 10,
              right: 350,
            }}
          >
            {currentUser.name}({currentUser?.role})
          </div>
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

const MenuSide = (props) => {
  const [hover, setHover] = useState(false)
  const currentUser = useCurrentUser()
  const [current, setCurrent] = useState(props.title)
  const { affixed } = props
  const sideData = [
    {
      name: "首页",
      icon: <HomeOutlined />,
      href: Routes.Home(),
    },
    {
      name: "问投",
      icon: <QuestionCircleOutlined />,
      href: Routes.QuestionsPage(),
    },
    {
      name: "职位",
      icon: <ReconciliationOutlined />,
      href: Routes.RecruitsPage(),
    },
    {
      name: "简历",
      icon: <HighlightOutlined />,
      href: Routes.ResumePage(),
    },
    // {
    //   name: "设置",
    //   icon: <SettingOutlined />,
    //   href: Routes.Home(),
    // },
  ]
  return (
    <div
      style={{
        position: "fixed",
        background: "white",
        zIndex: 1000,
        right: 0,
        bottom: 0,
        textAlign: "center",
        height: affixed ? "100vh" : "calc(100vh - 64px)",
        width: hover ? 60 : 40,
        transition: "width 0.2s, height 0.2s",
        cursor: "pointer",
        borderLeft: "1px solid #e9e9e9",
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* <HeartOutlined /> */}
      <div
        style={{
          paddingTop: "10vh",
          height: "40vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {sideData.map((item, index) => {
          return (
            <Link href={item.href} key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: 20 }}>{item.icon}</div>
                <div
                  style={{
                    fontSize: 10,
                    color: hover ? "black" : "white",
                    transition: "color 0.3s",
                  }}
                >
                  {item.name}
                </div>
              </div>
            </Link>
          )
        })}

        <Dropdown overlay={menu(currentUser, setCurrent, "side")}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: 20 }}>
              <SettingOutlined />
            </div>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: 10,
                color: hover ? "black" : "white",
                transition: "color 0.3s",
              }}
            >
              编辑
            </a>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

const Layout = ({ title, children }) => {
  useLayoutEffect(() => {
    setCurrent(title)
  }, [title])
  const [current, setCurrent] = useState(title)
  const [theme, setTheme] = useState("dark")
  const [affixed, setAffixed] = useState(false)
  return (
    <>
      <div
        style={{
          // backgroundImage: `url('/mountains.jpg')`,
          // backgroundRepeat: "no-repeat",
          background: "whitesmoke",
        }}
      >
        <div className="container">
          <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {/* 顶部菜单 */}
          <div style={{ width: "100%", fontSize: 40 }}>
            <Menu
              onClick={(e) => setCurrent(e.key)}
              selectedKeys={[current]}
              mode="horizontal"
              theme="dark"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "1.1rem",
                height: "4rem",
                alignItems: "center",
                marginLeft: "-7.2rem",
              }}
            >
              <Menu.Item key="Home" icon={<HomeOutlined style={{ fontSize: "1.1rem" }} />}>
                <Link href={Routes.Home()}>首页</Link>
              </Menu.Item>
              <Menu.Item
                key="Questions"
                icon={<QuestionCircleOutlined style={{ fontSize: "1.1rem" }} />}
              >
                <Link href={Routes.QuestionsPage()}>问投</Link>
              </Menu.Item>
              <Menu.Item
                key="Recruits"
                icon={<ReconciliationOutlined style={{ fontSize: "1.1rem" }} />}
              >
                <Link href={Routes.RecruitsPage()}>职位</Link>
              </Menu.Item>
              <Menu.Item key="Home2" icon={<HighlightOutlined style={{ fontSize: "1.1rem" }} />}>
                <Link href={Routes.ResumePage()}>简历</Link>
              </Menu.Item>
              {/* <Menu.Item key="Home2" icon={<HighlightOutlined style={{ fontSize: "1.1rem" }} />}>
                <Link href={Routes.ResumePage()}>分析</Link>
              </Menu.Item> */}
              <Suspense fallback={antIcon}>
                <UserInfo setCurrent={setCurrent} />
              </Suspense>
            </Menu>
          </div>
          {/* 侧边菜单 */}
          <Affix offsetTop={0} onChange={(e) => setAffixed(e)} />
          <Suspense fallback={antIcon}>
            <MenuSide affixed={affixed} title={title} />
          </Suspense>
          <BackTop visibilityHeight={0} style={{ marginRight: "20vh", marginBottom: "20vh" }}>
            <Button shape="circle" style={{ boxShadow: "2px 2px 2px #888888" }}>
              <UpOutlined />
            </Button>
          </BackTop>
          {/* 主体 */}
          <main>
            {" "}
            <Suspense fallback={antIcon}>{children} </Suspense>
          </main>
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
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width:1200px;
        }
        main p {
          font-size: 1.5rem;
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
          font-size:1.1rem;
          order: 4;
          margin-left:32rem;
        }
        .button {
          font-size:1.1rem;
          padding: 1rem 2rem;
          text-align: center;
        }
        .button.small {
          color:hsla(0,0%,100%,.65);
          padding: 0rem 1rem;
        }
        .button:hover {
          color: white;
        }
        pre {
          nd: #fafafa;
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
        .ant-menu.ant-menu-dark .ant-menu-item-selected {
          background-color:transparent;
        }
        .ant-menu-dark.ant-menu-horizontal>.ant-menu-item:hover {
          background-color:transparent;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
          /*定义滚动条高宽及背景
          高宽分别对应横竖滚动条的尺寸*/
        ::-webkit-scrollbar
          {
              width:4px;
              height:4px;
              background-color:#F5F5F5;
          }
          /*定义滚动条轨道
          内阴影+圆角*/
          ::-webkit-scrollbar-track
          {
              -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
              border-radius:10px;
              background-color:#F5F5F5;
          }
          /*定义滑块
          内阴影+圆角*/
          ::-webkit-scrollbar-thumb
          {
              border-radius:10px;
              -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
              background-color:#555;
          }
      `}</style>
        </div>
        {/* 页脚 */}
        <Footer
          style={{ marginTop: 10 }}
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
              icon: <AppstoreOutlined />,
              title: "更多产品",
              items: [
                {
                  icon: <MailOutlined />,
                  title: "语雀",
                  url: "https://yuque.com",
                  description: "知识创作与分享工具",
                  openExternal: true,
                },
                {
                  icon: <TrophyOutlined />,
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
        {/* 侧边菜单 */}
      </div>
    </>
  )
}

export default Layout

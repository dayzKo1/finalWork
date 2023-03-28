// import { Suspense, useState, useReducer, useEffect, useCallback } from "react"
// import { Head, Link, usePaginatedQuery, useRouter, Routes, Image, useMutation } from "blitz"
// import Layout from "app/core/layouts/Layout"
// import getRecruits from "app/recruits/queries/getRecruits"
// import { Button, Card, Tag, message, Input, Empty, Select, Divider } from "antd"
// import { LoadingOutlined } from "@ant-design/icons"
// import { useCurrentUser } from "app/core/hooks/useCurrentUser"
// import createApply from "app/applies/mutations/createApply"
// import getApplies from "app/applies/queries/getApplies"
// import createCollect from "app/collects/mutations/createCollect"
// import getCollects from "app/collects/queries/getCollects"
// import deleteCollect from "app/collects/mutations/deleteCollect"
// import { FixedSizeList as List } from "react-window"
// import { act } from "react-dom/test-utils"

// const { Search } = Input
// const { Option } = Select;

// const ITEMS_PER_PAGE = 4
// const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />

// export const RecruitsList = () => {
//   const router = useRouter()

//   const [search, setSearch] = useState(router.query.search ?? '')
//   const [activeTabKey, setactiveTabKey] = useState("default")
//   // 搜索
//   const onSearch = useCallback((value) => {
//     console.log(value)
//     setRecruData(recruits.filter((item, index, arr) => {
//       return item.name.indexOf(value) + 1 || item.user.name.indexOf(value) + 1
//     }))
//     onTabChange(activeTabKey)
//     setSearch(value)
//   }, [recruits, onTabChange, activeTabKey, setRecruData])

//   // 排序
//   const onTabChange = useCallback((key) => {
//     console.log(key)
//     switch (key) {
//       case "default":
//         recruitData.sort((m, n) => { return m.id - n.id });
//         break;
//       case "createdAt": recruitData.sort((m, n) => {
//         return date(n.createdAt) - date(m.createdAt)
//       })
//         break;
//       case "salary": recruitData.sort((m, n) => {
//         return number(n.salaryMax) - number(m.salaryMax)
//       })
//         break;
//       case "updatedAt": recruitData.sort((m, n) => {
//         return date(n.updatedAt) - date(m.updatedAt)
//       })
//         break;
//     }
//     setactiveTabKey(key)
//   }, [recruitData])

//   // 筛选
//   const handleSelect = async (value, select) => {
//     // let fieldName = ''
//     // switch (select) {
//     //   case '薪资要求': fieldName = 'salary'; break;
//     //   case '工作城市': fieldName = 'city'; break;
//     //   case '学历要求': fieldName = 'educ'; break;
//     //   case '工作经验': fieldName = 'year'; break;
//     //   case '职位类型': fieldName = 'type'; break;
//     //   case '公司性质': fieldName = 'abbu'; break;
//     //   case '公司规模': fieldName = 'size'; break;
//     // }
//     // const data1 = onSearch(search)
//     // setRecruData(data1.filter(item => item[fieldName].indexOf(value) + 1)
//     //   || item.user[fieldName].indexOf(value) + 1)
//     // onTabChange(activeTabKey)
//   }

//   const currentUser = useCurrentUser()
//   const [Applied, setApplied] = useState(false)
//   const [Collected, setCollected] = useState(false)
//   const [Selected, setSelected] = useState('')
//   const [{ collects }] = usePaginatedQuery(getCollects, {
//     orderBy: {
//       id: "asc",
//     },
//     skip: 0,
//     take: 100,
//     Collected,
//   })
//   const [{ recruits, count }] = usePaginatedQuery(getRecruits, {
//     orderBy: {
//       id: "asc",
//     },
//   })

//   const [recruitData, setRecruData] = useState(recruits)

//   // 申请
//   const [{ applies }] = usePaginatedQuery(getApplies, {
//     orderBy: {
//       id: "asc",
//     },
//     skip: 0,
//     take: 100,
//     Applied,
//   })
//   const [createApplication] = useMutation(createApply)

//   const number = (a) => {
//     let b = parseFloat(a)
//     if (a.indexOf("千") + 1) {
//       return b * 1000
//     }
//     if (a.indexOf("万") + 1) {
//       return b * 10000
//     }
//   }

//   const date = (a) => {
//     return Date.parse(a)
//   }

//   const tabList = [
//     {
//       key: "default",
//       tab: "默认排序",
//     },
//     {
//       key: "createdAt",
//       tab: "最新发布",
//     },
//     {
//       key: "salary",
//       tab: "薪酬最高",
//     },
//     {
//       key: "updatedAt",
//       tab: "最近活跃",
//     },
//   ]

//   const status = (arr, m, n) => {
//     return arr.some((item, index, arr) => {
//       return item?.userId === m?.id && item?.recruitId === n?.id
//     })
//   }

//   const Row = ({ index, style }) => (
//     <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
//       <Card
//         style={{ height: 150 }}
//         key={recruitData[index]?.id}
//         type="inner"
//         title={recruitData[index]?.name}
//         extra={
//           <Link
//             href={Routes.ShowRecruitPage({
//               recruitId: recruitData[index]?.id,
//             })}
//           >
//             <a>详情</a>
//           </Link>
//         }
//       >
//         <div style={{ display: "flex", justifyContent: "space-between", padding: 24 }}>
//           <div>
//             <div>
//               {recruitData[index]?.salaryMin}-{recruitData[index]?.salaryMax}<Divider type="vertical" />
//               {recruitData[index]?.city} <Divider type="vertical" />
//               {recruitData[index]?.year} <Divider type="vertical" />
//               {recruitData[index]?.educ} <Divider type="vertical" />
//               招{recruitData[index]?.avai}
//             </div>
//             <div>{recruitData[index]?.user?.name}</div>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             {currentUser?.role === "USER" && (
//               <>
//                 <Button
//                   style={{ marginRight: 10, width: 64, padding: 2 }}
//                   type="primary"
//                   onClick={async () => {
//                     await createApplication({
//                       userId: currentUser?.id,
//                       recruitId: recruitData[index]?.id,
//                     })
//                     setApplied(!Applied)
//                     message.success("申请成功")
//                   }}
//                   disabled={status(applies, currentUser, recruitData[index])}
//                 >
//                   {status(applies, currentUser, recruitData[index]) ? "已申请" : "申请"}
//                 </Button>
//                 <Button
//                   style={{ width: 64, padding: 2 }}
//                   type="primary"
//                   danger={status(collects, currentUser, recruitData[index])}
//                   onClick={async () => {
//                     if (!status(collects, currentUser, recruitData[index])) {
//                       await createCollect({
//                         userId: currentUser?.id,
//                         recruitId: recruitData[index]?.id,
//                       })
//                       message.success("收藏成功")
//                       setCollected(!Collected)
//                     } else {
//                       await deleteCollect({
//                         userId: currentUser?.id,
//                         recruitId: recruitData[index]?.id,
//                       })
//                       message.success("取消收藏成功")
//                       setCollected(!Collected)
//                     }
//                   }}
//                 >
//                   {status(collects, currentUser, recruitData[index]) ? "收藏√" : "收藏"}
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </Card>
//     </div>
//   )

//   const searchProps = {
//     search,
//     onSearch,
//     router,
//   }

//   const select2Props = {
//     recruits, onTabChange, activeTabKey, search, onSearch, setRecruData, handleSelect
//   }

//   return (
//     <>
//       <div>
//         <Search1 {...searchProps} />
//         {/* <Select1 /> */}
//       </div>
//       {/* <Select2 {...select2Props} /> */}
//       <div
//         style={{
//           display: "flex",
//           borderTop: "1px solid white",
//           width: 1065,
//         }}
//       >
//         <div>
//           <Card
//             style={{
//               width: 800,
//               marginRight: 10,
//               background: "none",
//               border: "none",
//             }}
//             headStyle={{
//               padding: 0,
//             }}
//             tabList={tabList}
//             activeTabKey={activeTabKey}
//             onTabChange={(key) => {
//               onTabChange(key)
//             }}
//           ></Card>
//           {recruitData.length > 0 ? <List
//             className="List"
//             height={600}
//             itemCount={recruitData.length}
//             itemSize={150}
//             width={800}
//           >
//             {Row}
//           </List> : <Empty style={{ marginTop: 10 }} description={
//             <span>
//               暂无数据
//             </span>
//           } />}

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               margin: 10,
//             }}
//           >
//             <div
//               style={{ marginRight: 10, marginTop: 5, color: "white" }}
//             >{`共 ${recruitData.length} 项`}</div>
//             {currentUser?.role === "COMPANY" && (
//               <Button type="primary">
//                 <Link href={Routes.NewRecruitPage()}>发布招聘信息</Link>
//               </Button>
//             )}
//           </div>
//         </div>
//         <div style={{ marginTop: 55 }}>
//           <Card
//             hoverable
//             style={{ width: 244, margin: "10px 10px 0px 10px", height: 138, borderRadius: 6 }}
//             cover={<Image layout="fill" alt="" src="/backgroudImage1.png" />}
//           ></Card>
//           <Card
//             hoverable
//             style={{ width: 244, margin: "10px 10px 10px 10px", height: 138, borderRadius: 6 }}
//             cover={<Image layout="fill" alt="" src="/backgroudImage2.png" />}
//           ></Card>
//         </div>
//         <style jsx>
//           {`
//             :global(.ant-card-body) {
//               padding: 0 !important;
//             }

//             :global(.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap) {
//               margin-bottom: 10px;
//             }

//             :global(.ant-tabs-tab:hover) {
//               color: white;
//             }

//             :global(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
//               color: white;
//             }

//             :global(.ant-card-head) {
//               border-bottom: none;
//             }

//             :global(.ant-card-bordered) {
//               border: none;
//             }

//             :global(.ant-card) {
//               border-radius: 0;
//             }

//           }
//           `}
//         </style>
//       </div>
//     </>
//   )
// }

// const Select1 = () => {

//   return (
//     <div style={{ position: 'absolute', top: 72, right: 500, display: 'flex', }}>
//       <div>
//         <Select
//           bordered={false}
//           placeholder="职位类别"
//         // onMouseEnter={e => setSelected(e.target.innerText)}
//         // open={Selected.includes("职位类别")}
//         >
//         </Select>
//       </div>
//       <div>
//         <Select
//           bordered={false}
//           placeholder="公司行业"
//         // onMouseEnter={e => setSelected(e.target.innerText)}
//         // open={Selected.includes("公司行业")}
//         >
//         </Select>
//       </div>
//     </div>
//   )
// }

// const Select2 = (props) => {
//   const selectors = ['薪资要求', '工作城市', '学历要求', '工作经验', '职位类型', '公司性质', '公司规模',]
//   const salaSel = ['不限', '4K以下', '4K - 6K', '6K - 8K', '8K - 10K', '10K - 15K', '15K - 25K', '25K - 35K', '35K - 50K', '50K以上',]
//   const citySel = ['北京', '上海', '广州', '深圳', '天津', '武汉', '西安', '成都', '大连', '长春', '沈阳', '南京', '济南岛', '杭州', '苏州', '无锡', '宁波', '重庆', '郑州', '长沙', '福州', '厦门', '哈尔滨',]
//   const educSel = ['初中及以下', '高中', '中专/中技', '大专', '本科', '硕士', 'MBA/EMBA', '博士',]
//   const yearSel = ['无经验', '1年以下', '1-3年', '3-5年', '5-10年', '10年以上',]
//   const typeSel = ['全职', '实习', '兼职/临时', '校园']
//   const abbuSel = ['不限', '国企', '外企', '合资', '民营', '上市公司', '股份制企业', '事业单位', '其他',]
//   const sizeSel = ['不限', '20人以下', '20-99人', '100-299人', '300-499人', '500-999人', '1000-9999人', '10000人以上',]
//   const cateSel = []
//   const fiedSel = []

//   const { recruits, onSearch, onTabChange, search, activeTabKey, setRecruData, handleSelect } = props

//   const renderSelections = select => {
//     let name
//     switch (select) {
//       case '薪资要求': name = 'salaSel'; break;
//       case '工作城市': name = 'citySel'; break;
//       case '学历要求': name = 'educSel'; break;
//       case '工作经验': name = 'yearSel'; break;
//       case '职位类型': name = 'typeSel'; break;
//       case '公司性质': name = 'abbuSel'; break;
//       case '公司规模': name = 'sizeSel'; break;
//     }
//     return (selData[name].map((item, index) =>
//       <Option key={index} value={item}>
//         {item}
//       </Option>
//     ))
//   }
//   const selData = {
//     salaSel,
//     citySel,
//     educSel,
//     yearSel,
//     typeSel,
//     abbuSel,
//     sizeSel,
//   }
//   return (
//     <div style={{ display: 'flex', marginBottom: 20 }}>
//       {selectors.map((item, index) =>
//         <Select
//           showArrow={false}
//           key={index}
//           allowClear
//           bordered={false}
//           placeholder={item}
//           style={{ width: 150, height: 40, fontSize: 18, color: 'white' }}
//           onChange={(value) => handleSelect(value, item)}
//         // onMouseEnter={e => setSelected(e.target.innerText)}
//         // open={Selected.includes(item)}
//         >
//           {renderSelections(item)}
//         </Select>)
//       }
//     </div >)
// }

// const Search1 = (props) => {
//   useEffect(() => {
//     onSearch(router.query.search ?? '')
//   }, [router, onSearch]);
//   const { onSearch, router, search } = props
//   return (
//     <div>
//       <Search
//         placeholder="搜索关键词"
//         allowClear
//         enterButton="搜索"
//         size="large"
//         value={search}
//         onSearch={onSearch}
//         onChange={e => onSearch(e.target.value)}
//         style={{ width: 1065, margin: 20 }}
//       />
//     </div>
//   )
// }

// const RecruitsPage = () => {
//   return (
//     <>
//       <Head>
//         <title>Recruits</title>
//       </Head>
//       <Suspense fallback={antIcon}>
//         <RecruitsList />
//       </Suspense>
//     </>
//   )
// }

// RecruitsPage.authenticate = true

// RecruitsPage.getLayout = (page) => <Layout title="Recruits">{page}</Layout>

// export default RecruitsPage1

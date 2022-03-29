一、常用指令:

blitz dev 启动

blitz prisma migrate dev 数据库迁移

blitz prisma studio 数据库 Web 界面

blitz routes 所有路由

blitz generate all question 代码生成(页面、crud、prisma 模型)

| 类型      | 模型 | Queries | Mutations | 页面 |
| --------- | ---- | ------- | --------- | ---- |
| all       | √    | √       | √         | √    |
| resource  | √    | √       | √         |      |
| model     | √    |         |           |      |
| crud      |      | √       | √         |      |
| queries   |      | √       |           |      |
| query     |      | √       |           |      |
| mutations |      |         | √         |      |
| mutation  |      |         | √         |      |
| pages     |      |         |           | √    |

blitz generate model [fieldName]:[type]:[attribute]

1. fieldName：
   - 使用 belongsTo 添加模型关系，例如：belongsTo:user-type
   - 可选 - 如果未指定，则默认为 string
   - 值： string、boolean、int、float、dateTime、json 或模 型名称
   - 添加 ? 使类型可选，如下所示：string?
   - 添加 [] 使类型成为一个列表，如：task[]
2. type
   - 可选的
   - 支持：default、unique
   - 如果属性接受一个参数，你可以用 = 包含它，例如： default=false 这会 将默认值设置为 false
   - <https://www.prisma.io/docs/concepts/components/prisma-schema/relations>

有一个关系 blitz g model project task:Task
有多个关系 blitz g model project tasks:Task[]
属于关系 blitz g model task belongsTo:project

blitz generate crud choice text votes:int:default=0 belongsTo:question

二、Q&A：
1、AntDesign 组件触发 useEffectLayout warning <https://github.com/ant-design/ant-design/issues/30396>
解决方案：React.useLayoutEffect = React.useEffect;
2、

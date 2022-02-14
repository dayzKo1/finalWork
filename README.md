blitz dev 启动

blitz prisma studio
可以查看数据库数据的 Web 界面

blitz generate all project

blitz prisma migrate dev

类型 模型 Queries Mutations 页面
all 是 Yes 是 是
resource 是 Yes 是
model 是
crud 是 是
queries 是
query 是
mutations 是
mutation 是
pages

blitz generate resource choice text votes:int:default=0 belongsTo:question

blitz generate crud choice text votes:int:default=0 belongsTo:question

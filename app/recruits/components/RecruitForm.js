import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
import { Field } from "react-final-form"
import InputControl from "app/core/components/InputControl"
import NoteControl from "app/core/components/NoteControl"
import { Box, Heading } from "@chakra-ui/react"

const cities = [
  "北京",
  "上海",
  "广州",
  "深圳",
  "天津",
  "武汉",
  "西安",
  "成都",
  "大连",
  "长春",
  "沈阳",
  "南京",
  "济南岛",
  "杭州",
  "苏州",
  "无锡",
  "宁波",
  "重庆",
  "郑州",
  "长沙",
  "福州",
  "厦门",
  "哈尔滨",
]
const avais = ["1~10人", "10~20人", "20~30人", "30~40人", "40~50人", "大于50人"]
const educs = ["初中及以下", "高中", "中专/中技", "大专", "本科", "硕士", "MBA/EMBA", "博士"]
const types = ["全职", "实习", "兼职/临时", "校园"]
const years = ["无经验", "1年以下", "1-3年", "3-5年", "5-10年", "10年以上"]

const selectStyle = {
  fontSize: "1rem",
  padding: "0.25rem 0.5rem",
  borderRadius: "3px",
  border: "1px solid #e9e9e9",
  appearance: "none",
  marginTop: "0.5rem",
  marginBottom: " 0.5rem",
  width: "100%",
}

export function RecruitForm(props) {
  return (
    <Form {...props}>
      <Box
        p={10}
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        alignItems="center"
        bg="#fdeff0"
        borderRadius="6px"
        d="flex"
      >
        <Box p={16}>
          <InputControl name="name" label="岗位名称" />
          <div style={{ display: "flex", width: 350 }}>
            <InputControl name="salaryMin" label="最低薪酬 (千/万)" />
            <InputControl name="salaryMax" label="最高薪酬 (千/万)" />
          </div>
          <label>
            招聘人数
            <Field name="avai" component="select" style={selectStyle}>
              {avais.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Field>
          </label>
          <label>
            工作经验
            <Field name="year" component="select" style={selectStyle}>
              {years.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Field>
          </label>
          <label>
            教育经历
            <Field name="educ" component="select" style={selectStyle}>
              {educs.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Field>
          </label>
          <label>
            职位类型
            <Field name="type" component="select" style={selectStyle}>
              {types.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Field>
          </label>
          <label>
            工作城市
            <Field name="city" component="select" style={selectStyle}>
              {cities.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Field>
          </label>
        </Box>

        <Box p={16}>
          <NoteControl name="description" label="职位简介" />
          <NoteControl name="detail" label="职位描述" />
        </Box>

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-weight: 600;
            font-size: 16px;
            color: grey;
          }
        `}</style>
      </Box>
    </Form>
  )
}

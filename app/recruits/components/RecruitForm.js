import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
import { Field } from "react-final-form"

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
  border: "1px solid purple",
  appearance: "none",
  marginTop: "0.5rem",
  marginBottom: " 0.5rem",
  width: "100%",
}

export function RecruitForm(props) {
  return (
    <div>
      <Form {...props}>
        <div style={{ display: "flex" }}>
          <div style={{ margin: 10 }}>
            <LabeledTextField name="name" label="岗位名称" placeholder="岗位名称" />
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <LabeledTextField
                name="salaryMin"
                label={
                  <div>
                    岗位薪酬
                    <span style={{ fontSize: 5, color: "wheat" }}> 单位:千/万</span>
                  </div>
                }
                placeholder="最低薪酬"
                style={{ width: 100, marginRight: 10 }}
              />
              <LabeledTextField
                name="salaryMax"
                label=""
                placeholder="最高薪酬"
                style={{ width: 100 }}
              />
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
          </div>

          <div style={{ margin: 10 }}>
            <label>
              教育经历
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
            <label>
              职位简介
              <Field
                style={{ width: 200, marginTop: "0.5rem" }}
                name="description"
                component="textarea"
                placeholder="职位简介"
              />
            </label>
            <label>
              职位描述
              <Field
                style={{ width: 200, marginTop: "0.5rem" }}
                name="detail"
                component="textarea"
                placeholder="职位描述"
              />
            </label>
          </div>
        </div>
      </Form>
      <style jsx>{`
        label {
          display: flex;
          flex-direction: column;
          align-items: start;
          font-size: 1rem;
        }
      `}</style>
    </div>
  )
}

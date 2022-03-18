import { Image } from "blitz"
import { Card } from "antd"

const SideCards = ({ top }) => (
  <div style={{ marginTop: top ?? 55 }}>
    <Card
      hoverable
      style={{ width: 280, margin: "10px 10px 0px 10px", height: 155, borderRadius: 6 }}
      cover={<Image layout="fill" alt="" src="/backgroudImage1.png" />}
    ></Card>
    <Card
      hoverable
      style={{ width: 280, margin: "10px 10px 10px 10px", height: 155, borderRadius: 6 }}
      cover={<Image layout="fill" alt="" src="/backgroudImage2.png" />}
    ></Card>
  </div>
)

export default SideCards

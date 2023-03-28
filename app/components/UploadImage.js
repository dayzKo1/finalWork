import { Image } from "blitz"
import React, { useState } from "react"
import { Upload } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />

const UploadImage = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!")
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  }

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      // customRequest={customRequest}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Image width={400} height={300} src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  )
}

export default UploadImage

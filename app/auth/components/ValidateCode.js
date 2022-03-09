import React, { useEffect } from "react"
const codeLength = 4
const fontSizeMin = 20
const fontSizeMax = 22
const backgroundColorMin = 240
const backgroundColorMax = 250
const colorMin = 10
const colorMax = 20
const lineColorMin = 40
const lineColorMax = 180
const contentWidth = 150
const contentHeight = 50
export default function ValidateCode(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => randomCode(), [])
  const { canvasRef, setCode } = props
  const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  const randomColor = (min, max) => {
    return `rgb(${randomNum(min, max)},${randomNum(min, max)},${randomNum(min, max)})`
  }

  const drawText = (ctx, txt, i, random) => {
    ctx.fillStyle = randomColor(colorMin, colorMax)
    ctx.font = `${randomNum(fontSizeMin, fontSizeMax)}px SimHei`
    let padding = 10
    let offset = (contentWidth - 40) / (random.length - 1)
    let x = padding
    if (i > 0) {
      x = padding + i * offset
    }
    let y = randomNum(fontSizeMax, contentHeight - 5)
    let deg = randomNum(-10, 10)
    // 修改坐标原点和旋转角度
    ctx.translate(x, y)
    ctx.rotate((deg * Math.PI) / 180)
    ctx.fillText(txt, 0, 0)
    // 恢复坐标原点和旋转角度
    ctx.rotate((-deg * Math.PI) / 180)
    ctx.translate(-x, -y)
  }

  const drawLine = (ctx) => {
    // 绘制干扰线
    for (let i = 0; i < 1; i++) {
      ctx.strokeStyle = randomColor(lineColorMin, lineColorMax)
      ctx.beginPath()
      ctx.moveTo(randomNum(0, contentWidth), randomNum(0, contentHeight))
      ctx.lineTo(randomNum(0, contentWidth), randomNum(0, contentHeight))
      ctx.stroke()
    }
  }

  const drawDot = (ctx) => {
    //绘制干扰点
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = randomColor(0, 255)
      ctx.beginPath()
      ctx.arc(randomNum(0, contentWidth), randomNum(0, contentHeight), 1, 0, 2 * Math.PI)
      ctx.fill()
    }
  }

  // 随机生成验证码
  const randomCode = () => {
    let random = ""
    // 去掉了I1io0
    const str = "QWERTYUPLKJHGFDSAZXCVBNMqwertyupkjhgfdsazxcvbnm1234567890"
    for (let i = 0; i < codeLength; i++) {
      let index = Math.floor(Math.random() * 57)
      random += str[index]
    }
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.textBaseline = "bottom"
    // 绘制背景
    ctx.shadowBlur = 20
    ctx.shadowColor = randomColor(backgroundColorMin, backgroundColorMax)
    ctx.fillStyle = randomColor(backgroundColorMin, backgroundColorMax)
    ctx.fillRect(0, 0, contentWidth, contentHeight)
    drawLine(ctx)
    drawDot(ctx)
    // 绘制文字
    for (let i = 0; i < random.length; i++) {
      drawText(ctx, random[i], i, random)
    }
    setCode(random)
  }
  return (
    <canvas
      onClick={randomCode}
      ref={canvasRef}
      width={contentWidth}
      height={contentHeight}
    ></canvas>
  )
}

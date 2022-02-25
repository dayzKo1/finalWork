import { getSession, BlitzApiRequest, BlitzApiResponse } from "blitz"
import sliderCaptcha from "@slider-captcha/core"

export default async function customRoute(req, res) {
  const session = await getSession(req, res)
  const { data, solution } = await sliderCaptcha.create()
  session.captcha = solution
  session.save()
  res.statusCode = 200
  res.end(data)
}

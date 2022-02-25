import { getSession, BlitzApiRequest, BlitzApiResponse } from "blitz"
import sliderCaptcha from "@slider-captcha/core"

export default async function customRoute(req, res) {
  const session = await getSession(req, res)
  const { verification } = await sliderCaptcha.verify(session.captcha, req.body)
  session.token = verification.token
  session.save()
  res.statusCode = 200
  res.end(verification)
}

import { Request, Response } from "express"
import { AuthUserService } from "../../services/user/AuthUserService"

class AuthUserController {
  async handle(request: Request, response: Response) {
    const { login, password } = request.body

    const authUserService = new AuthUserService()

    try {
      const auth = await authUserService.execute({ login, password })
      return response.json(auth)
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { AuthUserController }

import { Request, Response } from "express"
import { CreateUserService } from "../../services/user/CreateUserService"
import { UserRequest } from "../../models/interfaces/users/UserRequest"

class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      razao_social,
      cnpj,
      phone,
      email,
      password,
      confirmPassword
    }: UserRequest = request.body

    // validação de senha
    if (password !== confirmPassword) {
      return response.status(400).json({ error: "As senhas não conferem." })
    }

    const createUserService = new CreateUserService()

    try {
      const user = await createUserService.execute({
        razao_social,
        cnpj,
        phone,
        email,
        password
      })

      return response.status(201).json(user)
    } catch (err: any) {
      return response.status(400).json({ error: err.message })
    }
  }
}

export { CreateUserController }

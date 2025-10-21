import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import prismaClient from "../../prisma"
import { AuthRequest } from "../../models/interfaces/users/auth/AuthRequest"

class AuthUserService {
  async execute({ login, password }: AuthRequest) {
    if (!login) {
      throw new Error("Login (e-mail ou CNPJ) precisa ser enviado!")
    }

    if (!password) {
      throw new Error("Senha precisa ser enviada!")
    }

    const user = await prismaClient.user.findFirst({
      where: {
        OR: [{ email: login }, { cnpj: login }],
      },
    })

    if (!user) {
      throw new Error("Usuário ou senha incorretos!")
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new Error("Usuário ou senha incorretos!")
    }

    const token = sign(
      {
        razao_social: user.razao_social,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    )

    return {
      id: user.id,
      razao_social: user.razao_social,
      cnpj: user.cnpj,
      phone: user.phone,
      email: user.email,
      token: token,
    }
  }
}

export { AuthUserService }

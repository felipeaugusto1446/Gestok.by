import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'
import { UserRequest } from '../../models/interfaces/users/UserRequest'

class CreateUserService {
  async execute({ razao_social, cnpj, phone, email, password }: UserRequest) {
    // validação básica
    if (!email || !cnpj || !razao_social || !phone || !password) {
      throw new Error('Todos os campos são obrigatórios.')
    }

    // verifica duplicidade de email e CNPJ
    const existingUser = await prismaClient.user.findFirst({
      where: {
        OR: [{ email }, { cnpj }],
      },
    })

    if (existingUser) {
      throw new Error('E-mail ou CNPJ já cadastrado.')
    }

    // criptografa a senha
    const passwordHash = await hash(password, 8)

    // cria o usuário no banco
    const user = await prismaClient.user.create({
      data: {
        razao_social,
        cnpj,
        phone,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        razao_social: true,
        cnpj: true,
        phone: true,
        email: true,
        created_at: true,
      },
    })

    return user
  }
}

export { CreateUserService }

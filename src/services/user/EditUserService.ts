import prismaClient from "../../prisma";

interface EditUserRequest {
  user_id: string;
  razao_social?: string;
  cnpj?: string;
  phone?: string;
  email?: string;
}

class EditUserService {
  async execute({ user_id, razao_social, cnpj, phone, email }: EditUserRequest) {
    const userExists = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: user_id },
      data: {
        razao_social: razao_social ?? userExists.razao_social,
        cnpj: cnpj ?? userExists.cnpj,
        phone: phone ?? userExists.phone,
        email: email ?? userExists.email
      },
      select: {
        id: true,
        razao_social: true,
        cnpj: true,
        phone: true,
        email: true
      },
    });

    return updatedUser;
  }
}

export { EditUserService };

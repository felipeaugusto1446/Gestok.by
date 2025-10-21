import prismaClient from "../../prisma";

class DetailUserService {
  async execute(user_id: string) {
    // Busca o usuário pelo ID
    const user = await prismaClient.user.findUnique({
      where: { id: user_id },
      select: {
        id: true,
        razao_social: true,
        cnpj: true,
        phone: true,
        email: true,
        created_at: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user;
  }
}

export { DetailUserService };

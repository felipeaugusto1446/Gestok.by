import prismaClient from "../../prisma";

class RemoveUserService {
  async execute(user_id: string) {
    if (!user_id) {
      throw new Error("ID do usuário não informado.");
    }

    const user = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    await prismaClient.user.delete({
      where: { id: user_id },
    });

    return { message: "Usuário removido com sucesso." };
  }
}

export { RemoveUserService };

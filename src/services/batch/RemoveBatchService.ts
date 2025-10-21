import prismaClient from "../../prisma";

class RemoveBatchService {
  async execute(batch_id: string) {
    // verifica se o lote existe
    const batchExists = await prismaClient.batch.findUnique({
      where: { id: batch_id },
    });

    if (!batchExists) {
      throw new Error("Lote não encontrado.");
    }

    // exclui o lote
    await prismaClient.batch.delete({
      where: { id: batch_id },
    });

    // retorna mensagem de sucesso
    return { message: "Lote removido com sucesso." };
  }
}

export { RemoveBatchService };

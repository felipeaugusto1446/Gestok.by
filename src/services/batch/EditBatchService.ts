import prismaClient from "../../prisma";

interface EditBatchRequest {
  id: string;
  product_id?: string;
  brand?: string;
  lot_number?: string;
  expiration_date?: Date;
  notify_quantity?: number;
  notify_expiration?: number;
  quantity?: number;
}

class EditBatchService {
  async execute({
    id,
    product_id,
    brand,
    lot_number,
    expiration_date,
    notify_quantity,
    notify_expiration,
    quantity
  }: EditBatchRequest) {
    
    // 1️⃣ Verifica se o lote existe
    const batchExists = await prismaClient.batch.findUnique({
      where: { id },
      include: { product: true }
    });

    if (!batchExists) {
      throw new Error("Lote não encontrado.");
    }

    // 2️⃣ Se quiser alterar o produto, valida se ele existe
    if (product_id) {
      const productExists = await prismaClient.product.findUnique({
        where: { id: product_id }
      });
      if (!productExists) {
        throw new Error("Produto informado não existe.");
      }
    }

    // 3️⃣ Atualiza o lote
    const updatedBatch = await prismaClient.batch.update({
      where: { id },
      data: {
        product_id: product_id ?? batchExists.product_id,
        brand: brand ?? batchExists.brand,
        lot_number: lot_number ?? batchExists.lot_number,
        expiration_date: expiration_date ? new Date(expiration_date) : batchExists.expiration_date,
        notify_quantity: notify_quantity ?? batchExists.notify_quantity,
        notify_expiration: notify_expiration ?? batchExists.notify_expiration,
        quantity: quantity ?? batchExists.quantity,
        updated_at: new Date()
      },
      include: {
        product: {
          select: {
            name: true,
            category: { select: { name: true } }
          }
        }
      }
    });

    return updatedBatch;
  }
}

export { EditBatchService };

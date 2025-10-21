import prismaClient from "../../prisma";

class CheckBatchNotificationsService {
  async execute() {
    const today = new Date();

    const batches = await prismaClient.batch.findMany({
      include: {
        product: {
          select: { name: true }
        }
      }
    });

    const notifications: any[] = [];

    for (const batch of batches) {
      const daysUntilExpiration = Math.ceil(
        (batch.expiration_date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      // aviso de estoque baixo
      if (batch.quantity <= batch.notify_quantity) {
        notifications.push({
          type: "low_stock",
          message: `O produto ${batch.product.name} está acabando em seu estoque!`,
          product: batch.product.name,
          lot: batch.lot_number
        });
      }

      // aviso de vencimento próximo
      if (daysUntilExpiration <= batch.notify_expiration) {
        notifications.push({
          type: "near_expiration",
          message: `O lote ${batch.lot_number} do produto ${batch.product.name} está próximo de vencer!`,
          expiresInDays: daysUntilExpiration
        });
      }
    }

    return notifications;
  }
}

export { CheckBatchNotificationsService };

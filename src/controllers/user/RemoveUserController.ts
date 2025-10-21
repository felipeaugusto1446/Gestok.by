import { Request, Response } from "express";
import { RemoveUserService } from "../../services/user/RemoveUserService";

class RemoveUserController {
  async handle(request: Request, response: Response) {
    try {
      const user_id = request.user_id;

      const removeUserService = new RemoveUserService();
      const result = await removeUserService.execute(user_id);

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { RemoveUserController };

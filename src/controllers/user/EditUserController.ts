import { Request, Response } from "express";
import { EditUserService } from "../../services/user/EditUserService";

class EditUserController {
  async handle(request: Request, response: Response) {
    const { user_id, razao_social, cnpj, phone, email } = request.body;

    const editUserService = new EditUserService();
    const user = await editUserService.execute({
      user_id,
      razao_social,
      cnpj,
      phone,
      email,
    });

    return response.json(user);
  }
}

export { EditUserController };

import {Request,Response} from "express"
import { CreateUserService } from "../../services/user/CreateUserService.js"
import { UserRequest } from "../../models/interfaces/users/UserRequest.js"

class userController{
    async handle(request: Request,response:Response)
    {
        const {name,email,password}: UserRequest = request.body;
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({
            name,email,password
        });

        return response.json(user);
    }
}
export {userController}
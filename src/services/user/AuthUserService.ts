import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import prismaClient from "../../prisma"
import { AuthRequest } from "../../models/interfaces/users/auth/AuthRequest"

class AuthUserService
{
    async execute({email,password}:AuthRequest)
    {
        if(!email){
            throw new Error("email precisa ser enviado!");
            
        }

        if(!password){
            throw new Error("Senha precisa ser enviada!");
            
        }

        //verificar no banco de dados se existe um usuário com um email passado
        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        });
        if(!user){
            throw new Error("Wron username or password!");
        }
        
        //Verificar se a senha esta correta
        const passwordMatch = await compare(password,user?.password)

        if(!passwordMatch){
            throw new Error("Sua senha esta errada");
            
        }

        const token = sign(
            {
                name: user?.name,
                email: user?.email
            },
            process.env.JWT_SECRET as string,
            {
                subject: user?.id,
                expiresIn: "30d"
            }
        );
        return{
            id: user?.id,
            name:user?.name,
            email:user?.email,
            token: token

        }
    }
}
export { AuthUserService }
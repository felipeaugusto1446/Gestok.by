import prismaClient from '../../prisma';
import { hash } from "bcryptjs"
import { UserRequest } from "../../models/interfaces/users/UserRequest.js"

class CreateUserService{

    async execute({ name,email,password }:UserRequest) {
        if(!email){
            throw new Error("Email Incorret");
        }
        const userAlreadExists =  await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if(userAlreadExists){
            throw new Error("Email already exists");
        }
        //Encriptando a nossa senha do usuário
        const passwordHash =  await hash(password,8);

        //Criando nosso usuário
        const user = prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })
        return user;
    }
}

export {CreateUserService}
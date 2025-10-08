import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/createUserControler'; 
import { AuthUserController } from "./controllers/user/AuthUserController"
import { isAuthenticated } from './middlewares/isAuthenticated';
import { DetailUserController } from './controllers/user/DetailUserController';
import { RemoveUserController } from './controllers/user/RemoveUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
// Importa o Router do Express (para agrupar rotas)
// Request e Response são tipos do TypeScript, usados apenas para tipar os parâmetros

const router = Router();
// Cria uma instância do roteador, que será usada para registrar as rotas

router.get('/test', (request: Request, response: Response) => {
  // Define uma rota GET acessível em http://localhost:3333/test
  // A função de callback é executada sempre que essa rota for chamada

  return response.json({ ok: true });
  // Retorna uma resposta em formato JSON
});

//User Routs
router.post('/user',new CreateUserController().handle);
//quando fizemos uma requisição com o método post usando o caminho /user, sera gerado uma instância na controller e caira no método handle
//ele pegara as infos, irá no CreateUserService e criará o usuário

router.post('/session', new AuthUserController().handle);

router.get('/me',isAuthenticated,new DetailUserController().handle);
router.delete('/user/remove',new RemoveUserController().handle);

//Category Routes

router.post("/category",isAuthenticated,new CreateCategoryController().handle);
export { router };
// Exporta o roteador para que ele possa ser utilizado em outros arquivos

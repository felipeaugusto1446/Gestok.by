import { Router, Request, Response } from 'express';
import multer from 'multer';
import upLoadConfig from "./config/multer";

// Controllers - User
import { CreateUserController } from './controllers/user/CreateUserControler';
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from './controllers/user/DetailUserController';
import { RemoveUserController } from './controllers/user/RemoveUserController';

// Controllers - Category
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { EditCategoryController } from './controllers/category/EditCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { RemoveCategoryController } from './controllers/category/RemoveCategoryController';

// Controllers - Product
import { CreateProductController } from './controllers/product/CreateProductController';
import { RemoveProductController } from './controllers/product/RemoveProductController';
import { ListProductController } from "./controllers/product/ListProductController";
import { EditProductController } from "./controllers/product/EditProductController";

//Controllers - Batch
import { CreateBatchController } from './controllers/batch/CreateBatchController';
import { EditBatchController } from "./controllers/batch/EditBatchController";
import { RemoveBatchController } from "./controllers/batch/RemoveBatchController";
import { CheckBatchNotificationsController } from "./controllers/batch/CheckBatchNotificationsController";



// Middlewares
import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();
const upload = multer(upLoadConfig.upload("./tmp"));

// Test Route
router.get('/test', (request: Request, response: Response) => {
  return response.json({ ok: true });
});

// ==================== USER ROUTES ==================== 
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.delete('/user/remove', isAuthenticated, new RemoveUserController().handle);

// ==================== CATEGORY ROUTES ==================== 
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.put("/category/edit", isAuthenticated, new EditCategoryController().handle);
router.get("/category/all", isAuthenticated, new ListCategoryController().handle);
router.delete("/category/remove", isAuthenticated, new RemoveCategoryController().handle);

// ==================== PRODUCT ROUTES ==================== 
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);
router.delete("/product/remove", isAuthenticated, new RemoveProductController().handle);
router.get("/product/all", isAuthenticated, new ListProductController().handle);
router.put("/product/edit",isAuthenticated,
upload.single("file"), // caso tenha imagem
new EditProductController().handle);
//Para voce editar um campo do produto, é preciso passar a PK que no caso é o id do produto, e a informação dele.
//Voce pode passar apenas o campo que quer alterar ou todos eles, caso queira só um, passe apenas ele e o id
//Exemplo no json: (ele edita a descrição de um produto(Leita), a descrição era "De cabra" e agora passa a ser "De vaca")
// {
//   "id": "616ea397-584c-4c37-b1da-186faceebed7",
//   "description": "De Vaca"
// }


// ==================== BATCH ROUTES ==================== 
router.post("/batch", isAuthenticated, new CreateBatchController().handle)
router.put("/batch/edit", isAuthenticated, new EditBatchController().handle);
//Segue a mesma lógica do produto, editando agora a marca do leite
//Exemplo no json:
// {
//   "id": "9a226736-5cee-475e-9b89-59bb766059cd",
//   "brand": "Italac"
// }
router.delete("/batch/remove", isAuthenticated, new RemoveBatchController().handle);
const checkBatchNotificationsController = new CheckBatchNotificationsController();
router.get("/notifications", isAuthenticated, checkBatchNotificationsController.handle);




export { router };

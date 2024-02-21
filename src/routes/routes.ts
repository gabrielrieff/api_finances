import { Router } from "express";
import { createdUserController } from "../controller/users/create-user";
import { getUsersController } from "../controller/users/get-users";
import { authUserController } from "../controller/users/auth-user";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { deleteUserController } from "../controller/users/delete-user";
import { detailUserController } from "../controller/users/detail-user";

const router = Router();

router.post("/user", isAuthenticated, new createdUserController().handle);
router.post("/session", new authUserController().handle);
router.get("/users", isAuthenticated, new getUsersController().handle);
router.delete("/user/:id", isAuthenticated, new deleteUserController().handle);
router.get("/user/detail", isAuthenticated, new detailUserController().handle);

export { router };

import { Router } from "express";
import { createdUserController } from "../controller/users/create-user";
import { getUsersController } from "../controller/users/get-users";
import { authUserController } from "../controller/users/auth-user";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.post("/user", new createdUserController().handle);
router.get("/users", isAuthenticated, new getUsersController().handle);
router.post("/session", new authUserController().handle);

export { router };

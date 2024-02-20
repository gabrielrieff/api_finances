import { Router } from "express";
import { createdUserController } from "../controller/users/create-user";
import { getUsersController } from "../controller/users/get-users";

const router = Router();

router.post("/user", new createdUserController().handle);
router.get("/users", new getUsersController().handle);

export { router };

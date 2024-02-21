import { Router } from "express";
import { createdUserController } from "../controller/users/create-user";
import { getUsersController } from "../controller/users/get-users";
import { authUserController } from "../controller/users/auth-user";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { deleteUserController } from "../controller/users/delete-user";
import { detailUserController } from "../controller/users/detail-user";
import { updateUserController } from "../controller/users/update-user";
import multer from "multer";
import uploadConfig from "../config/multer";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp/image/user"));

router.post("/user", isAuthenticated, new createdUserController().handle);
router.post("/session", new authUserController().handle);
router.get("/users", isAuthenticated, new getUsersController().handle);
router.delete("/user/:id", isAuthenticated, new deleteUserController().handle);
router.get("/user/detail", isAuthenticated, new detailUserController().handle);
router.patch(
  "/user/:id",
  isAuthenticated,
  upload.single("file"),
  new updateUserController().handle
);

export { router };

import { resolve } from "path";
import { UpdateUserparams } from "../../@types/update-user-types";
import prismaClient from "../../db/prisma";
import { deletePhoto } from "../../helpers/deletePhoto";

export class updateUserRepo {
  async updateUser(id: string, params: UpdateUserparams) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not exist!");
    }

    await prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });

    if (params.photo || (user.photo !== null && params.photo)) {
      const folder = "./tmp/image/user";
      const image = user.photo!;

      const filePath = resolve(__dirname, "../", "../", "../", folder, image);
      console.log(filePath);
      await deletePhoto(filePath);
    }

    const isUser = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
    });

    return isUser;
  }
}

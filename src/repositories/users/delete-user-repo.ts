import { resolve } from "path";
import prismaClient from "../../db/prisma";
import { deletePhoto } from "../../helpers/deletePhoto";

export class deleteUserRepo {
  async deleteUser(id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not exist");
    }

    const { count } = await prismaClient.user.deleteMany({
      where: { id: id },
    });

    if (!count) {
      throw new Error("User not deleted");
    }

    const folder = "./tmp/image/user";
    const image = user.photo!;

    const filePath = resolve(__dirname, "../", "../", "../", folder, image);
    await deletePhoto(filePath);

    return user;
  }
}

import { resolve } from "path";
import prismaClient from "../../db/prisma";
import { deletePhoto } from "../../helpers/deletePhoto";

export class deleteCategoriRepo {
  async deleteCategoriRepo(id: string, userID: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userID,
      },
    });

    if (!user) {
      throw new Error("User not exist");
    }

    const existingCategori = await prismaClient.category.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        banner: true,
        title: true,
      },
    });

    if (!existingCategori) {
      throw new Error("category not found");
    }

    await prismaClient.category.delete({
      where: {
        id: id,
      },
    });

    const folder = "./tmp/image/categori";
    const filePath = resolve(
      __dirname,
      "../",
      "../",
      "../",
      folder,
      existingCategori.banner
    );

    await deletePhoto(filePath);

    return existingCategori;
  }
}

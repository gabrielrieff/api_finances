import prismaClient from "../../db/prisma";
import { CategoriModel } from "../../model/categoriModel";

export class createCategoriRepo {
  async createCategori({ banner, title }: CategoriModel) {
    const existingCategori = await prismaClient.category.findFirst({
      where: {
        title: title,
      },
    });

    if (existingCategori) {
      throw new Error("Existing category!");
    }

    const categori = await prismaClient.category.create({
      data: {
        title: title,
        banner: banner,
      },
      select: {
        id: true,
        title: true,
        banner: true,
      },
    });

    return categori;
  }
}

import prismaClient from "../../db/prisma";

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

    return user;
  }
}

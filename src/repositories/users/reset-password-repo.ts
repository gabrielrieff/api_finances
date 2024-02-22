import prismaClient from "../../db/prisma";

export class resetPasswordRepo {
  async reset(userID: string, password: string) {
    const user = await prismaClient.user.findFirst({
      where: { id: userID },
    });

    if (!user) {
      throw new Error("User not exist");
    }

    const updatePassword = await prismaClient.user.update({
      where: {
        id: userID,
      },
      data: {
        password: password,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        userType: true,
      },
    });

    return updatePassword;
  }
}

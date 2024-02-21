import prismaClient from "../../db/prisma";

export class detailUserRepo {
  async detailUser(id: string, startDate: Date, endDate: Date) {
    const detail = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        userType: true,
        firstName: true,
        lastName: true,
        photo: true,
        email: true,
        updated_at: true,
        created_at: true,
      },
    });
    const sumArray = await prismaClient.invoice.findMany({
      where: {
        userId: id,
        AND: [
          {
            created_at: { gte: startDate },
          },
          {
            created_at: {
              lt: endDate,
            },
          },
        ],
      },
      select: {
        value: true,
        type: true,
      },
    });

    let sum: number = 0;
    let revenue: number = 0;
    let expense: number = 0;

    if (sumArray.length > 0) {
      for (let i = 0; i < sumArray.length; i++) {
        if (sumArray[i].type === 0) {
          sum += sumArray[i].value;
          revenue += sumArray[i].value;
        } else {
          expense += sumArray[i].value;
          sum -= sumArray[i].value;
        }
      }
    }

    if (!detail) {
      throw new Error("User not exist");
    }

    const user = { ...detail, revenue, expense, sum };

    return user;
  }
}

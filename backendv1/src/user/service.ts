import prismaCLient from "../utiils/prismaClient";

class UserServices {

  static async getAllUsers() {
    try {
      const users = await prismaCLient.user.findMany();
    return users;
    } catch (error) {
      return{
        status: 500,
        message: "Error fetching users",
        error: error
      }
    }
  }

  static async createUser(name: string, email: string, password: string) {
    const user = await prismaCLient.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    return user;
  }

  static async changeUserEmail(email:string , newEmail:string , username:string):Promise<any> {
    const user = await prismaCLient.user.update({
      where: {
        email: email,
        name: username,
      },
      data: {
        email: newEmail,
      },
    });
    return user;
  }

  static async updatePassword(
    name: string,
    email: string,
    updatePassword: any
  ) {
    const user = await prismaCLient.user.update({
      where: {
        email: email,
        name: name,
      },
      data: {
        password: updatePassword,
      },
    });
    return user;
  }
  static async deleteUser(name: string, email: string) {
    const user = await prismaCLient.user.delete({
      where: {
        email: email,
        name: name,
      },
    });
    return user;
  }

  static async getUser({ name, email }: any) {
    const user = await prismaCLient.user.findUnique({
      where: {
        email: email,
        name: name,
      },
    });
    return user;
  }
  static async disconnect() {
    await prismaCLient.$disconnect();
  }

  static async questionSubmitted() {}
}

export default UserServices;

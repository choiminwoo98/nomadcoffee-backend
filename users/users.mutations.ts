import client from "../client";
import * as bcrypt from "bcrypt";
interface IUser {
  username: string;
  email: string;
  password: string;
  name: string;
}

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { email, username, name, password }: IUser
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingUser) {
          return {
            ok: false,
            error: "this username/password is already taken",
          };
        }
        const user = await client.user.create({
          data: {
            username,
            email,
            name,
            password: hashedPassword,
          },
        });
        return { ok: true };
      } catch (e) {
        return e;
      }
    },
  },
};

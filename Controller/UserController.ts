import { initServer } from "@ts-rest/express";
import { UserContract } from "../Contracts/UserContracts";
import user from "../Model/AuthModel";

const server = initServer();

const UserController = server.router(UserContract, {
  GetAllUser: async () => {
    try {
      const AllUser = await user.find();

      if (!AllUser) {
        return {
          status: 403,
          body: {
            success: false,
            message: "No user is in  database  ",
          },
        };
      }

      const userArray = AllUser.map((userItem) => ({
        id: userItem.id,
        email: userItem.email,
        password: userItem.password,
        username: userItem.name,
      }));

      return {
        status: 200,
        body: userArray,
      };
    } catch (err) {
      return {
        status: 500,
        body: {
          success: false,
          message: "Error Occurred",
        },
      };
    }
  },
});

export default UserController;

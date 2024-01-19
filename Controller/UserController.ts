import { initServer } from "@ts-rest/express";
import { UserContract } from "../Contracts/UserContracts";
import user from "../Model/AuthModel";
import { string, z } from "zod";

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
  DeleteUser: async ({ params }) => {
    try {
      const data = await user.findByIdAndDelete(params.id);
      if (!data) {
        return {
          status: 403,
          body: {
            message: "no is is found",
            success: false,
          },
        };
      }
      return {
        status: 200,
        body: {
          message: "successfuly deleted hai ta",
          success: true,
        },
      };
    } catch (err) {
      return {
        status: 500,
        body: {
          message: "unexpected error ",
          success: false,
        },
      };
    }
  },
  UpdatePassword: async ({ params, body }) => {
    try {
      let updatedData = await user.findByIdAndUpdate(
        params.id,
        {
          password: body.password,
        },
        { new: true }
      );
      if (!updatedData) {
        return {
          status: 403,
          body: {
            message: "data is not available ",
            success: false,
          },
        };
      }

      const { id, email, password } = updatedData;
      return {
        status: 200,
        body: {
          email,
          id,
          password,
        },
      };
    } catch (err) {
      return {
        status: 500,
        body: {
          message: "error occured",
          success: false,
        },
      };
    }
  },
});

export default UserController;

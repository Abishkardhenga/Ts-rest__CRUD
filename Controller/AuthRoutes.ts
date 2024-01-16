import { initServer } from "@ts-rest/express";
import { AuthContract } from "../Contracts/AuthContract";
import { RegisterSchema } from "../Contracts/AuthContract";
import user from "../Model/AuthModel";
const s = initServer();

console.log("atuh contract", AuthContract);

const AuthController = s.router(AuthContract, {
  RegisterUser: async ({ body }) => {
    //

    try {
      const validatedData = await user.create(body);
      return {
        status: 201,
        body: {
          id: validatedData.id,
          name: validatedData.name,
          email: validatedData.email,
        },
      };
    } catch (err) {
      return {
        status: 500,
        body: {
          message: " error creating the data",
          success: false,
        },
      };
    }
  },

  LoginUser: async ({ body }) => {
    try {
      const userExist = await user.findOne({ email: body.email });

      if (!userExist) {
        return {
          status: 404,
          body: {
            message: "this email address doesnot exist",
            success: false,
          },
        };
      }
      if (userExist.password !== body.password) {
        return {
          status: 403,
          body: {
            message: " invalid Credentials",
            success: false,
          },
        };
      }

      return {
        status: 200,
        body: {
          email: userExist.email,
          id: userExist.id,
          name: userExist.name,
        },
      };
    } catch (err) {
      return {
        status: 500,
        body: {
          message: " unexpected error",
          success: false,
        },
      };
    }
  },
});

export default AuthController;

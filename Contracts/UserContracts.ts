import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ErrorSchema } from "../Contracts/AuthContract";

const server = initContract();

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: z.string(),
  username: z.string(),
});

export const DeleteSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export const UserContract = server.router({
  GetAllUser: {
    method: "GET",
    path: "/user",
    responses: {
      200: z.array(userSchema),
      403: ErrorSchema,
      500: ErrorSchema,
    },
  },
  DeleteUser: {
    method: "DELETE",
    path: `/delete`,
    responses: {
      200: DeleteSchema,
      //   404: ErrorSchema,
      403: ErrorSchema,
      500: ErrorSchema,
    },

    pathParams: z.object({
      id: z.coerce.number(),
    }),
  },
});

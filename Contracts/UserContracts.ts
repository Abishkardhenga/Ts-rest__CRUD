import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ErrorSchema } from "../Contracts/AuthContract";

const server = initContract();

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  username: z.string(),
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
});

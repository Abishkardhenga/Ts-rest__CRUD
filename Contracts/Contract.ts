import { initContract } from "@ts-rest/core";
import { boolean, string, z } from "zod";
import {data} from "../data"

const c = initContract();
export const ProductSchema = z.object({
  id:z.number(),
  image: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
});
const ErrorSchema = z.object({
  body: z.string(),
  success: z.boolean(),
});

export const contract = c.router({
  // createProduct: {
  //   method: "POST",
  //   path: "/createProduct",
  //   responses: {
  //     200: ProductSchema,
  //     403: ErrorSchema,
  //   },
  //   body: z.object({
  //     image: z.string(),
  //     name: z.string(),
  //     description: z.string(),
  //     price: z.number(),
  //   }),
  //   summary: "this is create product",
  // },
  getProduct: {
    method: "GET",
    path: "/product",
    responses: {
      200: z.array(ProductSchema)
    },
    summary: "this is get post  ",
  },
});

import { initContract } from "@ts-rest/core";
import { boolean, string, z } from "zod";


export const ResponseSchema = z.object({
    name:z.string(),
    id:z.string(),
    email:z.string().email()
})
export const RegisterSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string(),

})
export const LoginSchema = z.object({
    email:z.string().email()    ,          
  password:z.string(),

})

export const ErrorSchema = z.object({
    message:z.string(),
    success:z.boolean()
})


const c = initContract()

export const AuthContract = c.router({

     RegisterUser : {
        method:"POST",
        path : "/register",
        responses: {  201 :ResponseSchema , 500:ErrorSchema},
        body:RegisterSchema,
        summary :  "this is api register user "


    }
    ,
    LoginUser : { 
        method:"POST",
        path:"/login",
        responses:{
            200: ResponseSchema,
            404:ErrorSchema,
            403:ErrorSchema,
            500:ErrorSchema
        },

        body:LoginSchema,
        summary :  "this is api register user "
    },


})
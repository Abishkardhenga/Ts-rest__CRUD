import {Schema, model} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}



const User = new Schema <IUser> (
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
 
  },
  { timestamps: true }
);

const user = model<IUser>("User", User)
export default user 
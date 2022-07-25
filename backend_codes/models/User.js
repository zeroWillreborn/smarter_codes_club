import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String,  trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  bio: { type: String,  trim: true },
  skills: [],
  projects: [{title:String,description:String,projectSkills:Object}],
})

const UserModel = mongoose.model("user", userSchema)
export default UserModel
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Joi from "joi";
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
   },
   password: {
      type: String,
      required: true,
   },
   role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
   },
   ticket:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
   }],
});

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
   } catch (error) {
      next(error);
   }
});

userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);

};
export const validateUser = (user) => {
   const schema = Joi.object({
      name: Joi.string().required().min(3),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
   });
   return schema.validate(user);
};
const User = mongoose.model("User", userSchema);

export default User;

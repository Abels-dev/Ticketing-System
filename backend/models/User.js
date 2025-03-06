import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
   ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
   },
});

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods(
   (matchPassword = async (enteredPassword) => {
      return await bcrypt.compare(enteredPassword, this.password);
   })
);

const User = mongoose.model("User", userSchema);

export default User;

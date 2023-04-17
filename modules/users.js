import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please render a Pin"],
  },

  password: {
    type: String,
    unique: [true, "psw has already exists"],
    maxlength: [5, "Pin should be 5 characters long"],
  },
  isTeacher: {
    type: Boolean,
  },
});
export default mongoose.model("users", usersSchema);

import mongoose from "mongoose";
const playsSchema = new mongoose.Schema({
  gamePin: {
    type: String,
    required: [true, "Please render a Pin"],
    unique: [true, "Pin's game has already exists"],
    maxlength: [5, "Pin should be 5 characters long"],
  },

  admin: {
    type: String,
  },
  participants: {
    type: [String],
  },
});
export default mongoose.model("plays", playsSchema);

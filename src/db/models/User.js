import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  company: { type: String, required: false },
  title: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  interests: { type: Array, required: false },
  information: { type: String, required: false },
  dsgvo: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date().toLocaleString() },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

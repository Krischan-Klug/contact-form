import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  ozon: { type: String, required: false },
  colon: { type: String, required: false },
  veterinary: { type: String, required: false },
  disposables: { type: String, required: false },
  dsgvo: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

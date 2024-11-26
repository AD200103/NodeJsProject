import mongoose from "mongoose";

const fighterSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  style: { type: String, required: true },
  country: { type: String, required: true },
  userId: { type: String, required: true },
  age: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  fights: { type: String, required: true },
  wins: { type: String, required: true },
  losses: { type: String, required: true },
  draws: { type: String, required: true },
});

export default mongoose.model("fighter", fighterSchema);

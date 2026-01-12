import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String }, // e.g., "Jan 2024"
});

const Achievement =
  mongoose.models.Achievement ||
  mongoose.model("Achievement", achievementSchema);

export default Achievement;

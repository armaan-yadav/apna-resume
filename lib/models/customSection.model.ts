import mongoose from "mongoose";

const customSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Rich HTML content
});

const CustomSection =
  mongoose.models.CustomSection ||
  mongoose.model("CustomSection", customSectionSchema);

export default CustomSection;

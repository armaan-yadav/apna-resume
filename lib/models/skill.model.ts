import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  skills: [{ type: String }],
});

const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);

export default Skill;

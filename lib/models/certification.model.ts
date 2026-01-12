import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: String }, // e.g., "Jan 2024"
  expiryDate: { type: String }, // optional
  credentialUrl: { type: String }, // optional link to credential
});

const Certification =
  mongoose.models.Certification ||
  mongoose.model("Certification", certificationSchema);

export default Certification;

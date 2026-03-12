import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProject extends Document {
  projectName: string;
  description: string;
  userId: Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    projectName: { type: String, required: true },
    description: String,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IProject>("Project", projectSchema);

import mongoose, { Schema } from "mongoose";

// TypeScript da tiplash
interface IPage {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Mongoose da tiplash
const pageSchema = new Schema<IPage>({
  userId: { type: Number, required: true },
  id: { type: Number, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

// Model
const pageModel = mongoose.model("page", pageSchema);

export default pageModel;

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
});

export const BookModel = mongoose.model("Book", bookSchema);
import mongoose from "mongoose";

export const ToDoSchema = new mongoose.Schema({
  heading: String,
  content: String,
  attachedId: String,
});

const ToDo = mongoose.models.ToDo || mongoose.model("ToDo", ToDoSchema);

export default ToDo;

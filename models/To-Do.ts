//import from libraries
import mongoose from "mongoose";

//create toDo's schema
export const ToDoSchema = new mongoose.Schema({
  heading: String,
  content: String,
  attachedId: String,
  status: String,
});

//create ToDo model
const ToDo = mongoose.models.ToDo || mongoose.model("ToDo", ToDoSchema);

//export by default ToDo's model
export default ToDo;

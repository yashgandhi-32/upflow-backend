import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    url: String,
    name: String
});
export const File = mongoose.model("File", fileSchema);

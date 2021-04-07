import mongoose from "mongoose";

const cellSchema = mongoose.Schema({
    row: { type: Number, required:  true },
    column: { type: Number, required: true },
    value: { type: String, required: true },
    formula: { type: String, required: true },
});

export default mongoose.model("Cell", cellSchema);
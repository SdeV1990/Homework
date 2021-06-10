import mongoose from "mongoose";

const documentSchema = mongoose.Schema({
    name: { type: String, required:  true },
    createdAt: { type: Date, required: true, default: new Date() },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    changedAt: { type: Date, required: true, default: new Date() }, 
    // changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isRecycled: { type: Boolean, required: true, default: false },
    recycledAt: {type: Date, required: false},
    isDeleted: { type: Boolean, required: true, default: false },
    deletedAt: {type: Date, required: false},
    rightsAccess: {
        readAndCopy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    sheets: [{
        id: { type: String },
        name: { type: String, required:  true },
        rowQuantity: { type: Number, required: true , default: 30 },
        rowDefaultHeight: {type: Number, required: true, default: 21 },
        rowHeight: {},
        columnQuantity: { type: Number, required: true , default: 30 },
        columnDefaultWidth: {type: Number, required: true, default: 80 },
        columnWidth: {},
        cells: {},
    }]
});

export default mongoose.model("Document", documentSchema);
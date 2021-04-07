import mongoose from "mongoose";

const documentSchema = mongoose.Schema({
  name: { type: String, required:  true },
  createdAt: { type: Date, required: true },
  changedAt: { type: Date, required: true },
  id: { type: String },
  sheets: [{
        id: { type: String },
        name: { type: String, required:  true },
        rowQuantity: { type: Number, required: true , default: 100},
        rowDefaultWidth: {type: Number, required: true, default: 40},
        columnQuantity: { type: Number, required: true , default: 100},
        columnDefaultWidth: {type: Number, required: true, default: 40},
        cells: [{
            row: { type: Number, required:  true },
            column: { type: Number, required: true },
            value: { type: String, required: true },
            formula: { type: String, required: true },
        }]
    }]
});

export default mongoose.model("Document", documentSchema);

// import mongoose from "mongoose";

// const sheetSchema = mongoose.Schema({
//     id: { type: String },
//     name: { type: String, required:  true },
//     rowQuantity: { type: Number, required: true , default: 100},
//     rowDefaultWidth: {type: Number, required: true, default: 40},
//     columnQuantity: { type: Number, required: true , default: 100},
//     columnDefaultWidth: {type: Number, required: true, default: 40},
//     cells: [{
//         row: { type: Number, required:  true },
//         column: { type: Number, required: true },
//         value: { type: String, required: true },
//         formula: { type: String, required: true },
//     }]
// });

// export default mongoose.model("Sheet", sheetSchema);
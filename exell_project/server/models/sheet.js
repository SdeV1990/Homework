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





// import mongoose from "mongoose";

// const cellSchema = mongoose.Schema({
//     row: { type: Number, required:  true },
//     column: { type: Number, required: true },
//     value: { type: String, required: true },
//     formula: { type: String, required: true },
// });

// export default mongoose.model("Cell", cellSchema);
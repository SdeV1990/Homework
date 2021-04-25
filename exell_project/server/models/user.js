import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    friends: [
        {type: String },
    ]
});

export default mongoose.model("User", userSchema);
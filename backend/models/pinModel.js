import mongoose from "mongoose";

const pinSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
        min: 3,
        max: 60,
    },
    desc: {
        type: String,
        required: true,
        min: 3,
    },
    long: {
        type: Number,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Pin = mongoose.model("Pin", pinSchema);

export default Pin;
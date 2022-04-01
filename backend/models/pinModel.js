import mongoose from "mongoose";

const pinSchema = new mongoose.Schema({
    place: {
        type: String,
        required: [true, "Please Enter Place Name"],
        minLength: 3,
        maxLength: [60, "Place name cannot exceed 60 characters"],
        trim: true,
    },
    desc: {
        type: String,
        required: [true, "Please Enter Pin Description"],
        minLength: 3,
    },
    long: {
        type: Number,
        required: [true, "Please Enter Latitude "],
    },
    lat: {
        type: Number,
        required: [true, "Please Enter Longitude "],
    },
    type: {
        type: String,
        required: [true, "Please Enter Pin Type "],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }, ],
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        // avatar: {
        //     public_id: {
        //         type: String,
        //         required: true,
        //     },
        //     url: {
        //         type: String,
        //         required: true,
        //     },
        // },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        // images: [{
        //     public_id: {
        //         type: String,
        //         required: true,
        //     },
        //     url: {
        //         type: String,
        //         required: true,
        //     },
        // }, ],
    }, ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Pin = mongoose.model("Pin", pinSchema);

export default Pin;
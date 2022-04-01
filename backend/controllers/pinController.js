import Pin from "../models/pinModel.js";
import asyncHandler from "express-async-handler";
import ApiFeatures from "../utils/apifeatures.js";
import cloudinary from "cloudinary";

//get all pins
const getAllPins = asyncHandler(async(req, res) => {
    const resultPerPage = 8;

    const pinsCount = await Pin.countDocuments();

    const apiFeature = new ApiFeatures(Pin.find(), req.query).search().filter();

    let pins = await apiFeature.query;

    let filteredPinsCount = pins.length;

    apiFeature.pagination(resultPerPage);

    pins = await apiFeature.query;

    res.status(200).json({
        success: true,
        pins,
        pinsCount,
        resultPerPage,
        filteredPinsCount,
    });
});

//get pin details by id
const getPinDetailsById = asyncHandler(async(req, res, next) => {
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
        return next(new Error("Pin not found", 404));
    }
    res.status(200).json({
        success: true,
        pin,
    });
});

//get all pins --admin/superadmin
const getAdminPins = asyncHandler(async(req, res, next) => {
    const pins = await Pin.find();

    res.status(200).json({
        success: true,
        pins,
    });
});

//create new pin --admin/superadmin
const CreatePin = asyncHandler(async(req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "pins",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    req.body.username = req.user.username;

    const pin = await Pin.create(req.body);

    res.status(201).json({
        success: true,
        pin,
    });
});

//delete pin by id --admin/superadmin
const DeletePin = asyncHandler(async(req, res, next) => {
    const pin = await Pin.findById(req.params.id);

    if (!pin) {
        return next(new Error("Pin not found", 404));
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < pin.images.length; i++) {
        await cloudinary.v2.uploader.destroy(pin.images[i].public_id);
    }

    await pin.remove();

    res.status(200).json({
        success: true,
        message: "Pin Delete Successfully",
    });
});

//update pin by id --admin/superadmin
const UpdatePin = asyncHandler(async(req, res, next) => {
    let pin = await Pin.findById(req.params.id);

    if (!pin) {
        return next(new ErrorHander("Pin not found", 404));
    }

    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < pin.images.length; i++) {
            await cloudinary.v2.uploader.destroy(pin.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "pins",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    pin = await Pin.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        pin,
    });
});

// Create New Review or Update the review --admin/superadmin
const createPinReview = asyncHandler(async(req, res, next) => {
    const { rating, comment, pinId } = req.body;

    const review = {
        user: req.user._id,
        username: req.user.username,
        // avatar: {
        //     public_id: req.user.public_id,
        //     url: req.user.secure_url,
        // },
        rating: Number(rating),
        comment,
    };

    const pin = await Pin.findById(pinId);

    const isReviewed = pin.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        pin.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        pin.reviews.push(review);
        pin.numOfReviews = pin.reviews.length;
    }

    let avg = 0;

    pin.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    pin.ratings = avg / pin.reviews.length;

    await pin.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get All Reviews of a pin
const getPinReviews = asyncHandler(async(req, res, next) => {
    const pin = await Pin.findById(req.query.id);

    if (!pin) {
        return next(new Error("Pin not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: pin.reviews,
    });
});

// Delete Review
const deleteReview = asyncHandler(async(req, res, next) => {
    const pin = await Pin.findById(req.query.pinId);

    if (!pin) {
        return next(new Error("Pin not found", 404));
    }

    const reviews = pin.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Pin.findByIdAndUpdate(
        req.query.pinId, {
            reviews,
            ratings,
            numOfReviews,
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});

export {
    getPinDetailsById,
    getAllPins,
    getAdminPins,
    CreatePin,
    DeletePin,
    UpdatePin,
    createPinReview,
    getPinReviews,
    deleteReview,
};
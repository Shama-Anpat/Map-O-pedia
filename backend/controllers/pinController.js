import Pin from "../models/pinModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user pins
// @route   GET /api/pins
// @access  Private
const getPins = asyncHandler(async(req, res) => {
    const pins = await Pin.find({ user: req.user._id });
    res.json(pins);
});

//@description     Fetch single Pin
//@route           GET /api/pins/:id
//@access          Public
const getPinById = asyncHandler(async(req, res) => {
    const pin = await Pin.findById(req.params.id);

    if (pin) {
        res.json(pin);
    } else {
        res.status(404).json({ message: "Pin not found" });
    }
});

//@description     Create single Pin
//@route           GET /api/pins/create
//@access          Private
const CreatePin = asyncHandler(async(req, res) => {
    const { title, desc, lat, long, type } = req.body;

    if (!title || !desc || !lat || !lat || !long || !type) {
        res.status(400);
        throw new Error("Please Fill all the feilds");
        return;
    } else {
        const pin = new Pin({ user: req.user._id, title, desc, lat, long, type });

        const createdPin = await pin.save();

        res.status(201).json(createdPin);
    }
});

//@description     Delete single Pin
//@route           GET /api/pins/:id
//@access          Private
const DeletePin = asyncHandler(async(req, res) => {
    const pin = await Pin.findById(req.params.id);

    if (pin.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (pin) {
        await pin.remove();
        res.json({ message: "Pin Removed" });
    } else {
        res.status(404);
        throw new Error("Pin not Found");
    }
});

// @desc    Update a pin
// @route   PUT /api/pins/:id
// @access  Private
const UpdatePin = asyncHandler(async(req, res) => {
    const { title, desc, lat, long, type } = req.body;

    const pin = await Pin.findById(req.params.id);

    if (pin.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (pin) {
        pin.title = title;
        pin.desc = desc;
        pin.lat = lat;
        pin.long = long;
        pin.type = type;

        const updatedPin = await pin.save();
        res.json(updatedPin);
    } else {
        res.status(404);
        throw new Error("Pin not found");
    }
});

export { getPinById, getPins, CreatePin, DeletePin, UpdatePin };
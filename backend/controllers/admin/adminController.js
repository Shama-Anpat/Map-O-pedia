import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import sendToken from "../../utils/generateToken.js";
// import sendEmail from "../utils/sendEmail.js";
import cloudinary from "cloudinary";
// import crypto from "crypto";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authAdmin = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
        (user.role === "admin" || user.role === "super-admin") &&
        (await user.matchPassword(password))
    ) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            fullName: user.fullName,
            avatar: user.avatar,
            token: sendToken(user._id, user.role),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerAdmin = asyncHandler(async(req, res) => {
    const myPic = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "admin pics",
        widht: 150,
        crop: "scale",
    });

    const myProof = await cloudinary.v2.uploader.upload(req.body.proof, {
        folder: "admin proofs",
        widht: 150,
        crop: "scale",
    });

    const { username, email, password } = req.body;
    const adminExists = await User.findOne({ email });
    if (adminExists) {
        res.status(404);
        throw new Error("Admin already exists");
    }

    let role = "admin";
    const admin = await User.create({
        username,
        email,
        password,
        avatar: {
            public_id: myPic.public_id,
            url: myPic.secure_url,
        },
        proof: {
            public_id: myProof.public_id,
            url: myProof.secure_url,
        },
        role,
    });
    sendToken(admin, role, 201, res);
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateAdminProfile = asyncHandler(async(req, res) => {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
    };

    if (req.body.avatar !== "" && req.body.proof !== "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;
        const proofId = user.proof.public_id;

        await cloudinary.v2.uploader.destroy(imageId);
        await cloudinary.v2.uploader.destroy(proofId);

        const myPic = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "admin pics",
            width: 150,
            crop: "scale",
        });
        newUserData.avatar = {
            public_id: myPic.public_id,
            url: myPic.secure_url,
        };

        const myProof = await cloudinary.v2.uploader.upload(req.body.proof, {
            folder: "admin proofs",
            width: 150,
            crop: "scale",
        });
        newUserData.proof = {
            public_id: myProof.public_id,
            url: myProof.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        user,
    });
});

export { authAdmin, registerAdmin, updateAdminProfile };
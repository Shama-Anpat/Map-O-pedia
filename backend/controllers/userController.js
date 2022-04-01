import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import sendToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import cloudinary from "cloudinary";
import crypto from "crypto";

//register User
const registerUser = asyncHandler(async(req, res) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "userprofile",
        widht: 150,
        crop: "scale",
    });
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(404);
        throw new Error("User already exists");
    }

    const user = await User.create({
        username,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        proof: {
            public_id: "null",
            url: "null",
        },
    });
    sendToken(user, 201, res);
});

// update User Profile
const updateUserProfile = asyncHandler(async(req, res, next) => {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
    };

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "userprofile",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

//login common for all roles
const authUser = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new Error("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new Error("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.matchPassword(password);

    if (!isPasswordMatched) {
        return next(new Error("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// Forgot Password common for all roles
const forgotPassword = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new Error("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is TEMPPP :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Map-O-Pedia Password Recovery`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new Error(error.message, 500));
    }
});

// Reset Password common for all roles
const resetPassword = asyncHandler(async(req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new Error("Reset Password Token is invalid or has been expired", 400)
        );
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new Error("Password does not password", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// update password common for all roles
const updatePassword = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.matchPassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new Error("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new Error("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// register Admin
const registerAdmin = asyncHandler(async(req, res) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "userprofile",
        widht: 150,
        crop: "scale",
    });
    const myProof = await cloudinary.v2.uploader.upload(req.body.proof, {
        folder: "proofs",
        widht: 150,
        crop: "scale",
    });
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(404);
        throw new Error("User already exists");
    }
    let role = "admin";
    const user = await User.create({
        username,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        proof: {
            public_id: myProof.public_id,
            url: myProof.secure_url,
        },
        role,
    });
    sendToken(user, 201, res);
});

// update Admin Profile
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
            folder: "admin profile ",
            width: 150,
            crop: "scale",
        });
        newUserData.avatar = {
            public_id: myPic.public_id,
            url: myPic.secure_url,
        };

        const myProof = await cloudinary.v2.uploader.upload(req.body.proof, {
            folder: "proofs",
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

// logout common for all roles
const logout = asyncHandler(async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Get Detail common for all roles
const getUserDetails = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Get all users(superadmin)
const getAllUser = asyncHandler(async(req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get single user (superadmin)
const getSingleUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new Error(`User does not exist with Id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// update User Role -- superAdmin
const updateUserRole = asyncHandler(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete User --superAdmin
const deleteUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new Error(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});

export {
    authUser,
    updateUserProfile,
    registerUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    registerAdmin,
    updateAdminProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
};
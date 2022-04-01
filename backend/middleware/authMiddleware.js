import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async(req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new Error("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new Error(
                    `Role: ${req.user.role} is not allowed to access this resouce `,
                    403
                )
            );
        }

        next();
    };
};

const userMiddleware = asyncHandler(async(req, res, next) => {
    if (req.user.role !== "user") {
        if (req.user.role !== "admin") {
            if (req.user.role !== "super-admin") {
                return res.status(400).json({ message: "User access denied" });
            }
        }
    }
    next();
});
const adminMiddleware = asyncHandler(async(req, res, next) => {
    if (req.user.role !== "admin") {
        if (req.user.role !== "super-admin") {
            return res.status(400).json({ message: "Admin access denied" });
        }
    }
    next();
});

const superAdminMiddleware = asyncHandler(async(req, res, next) => {
    if (req.user.role !== "super-admin") {
        return res.status(200).json({ message: "Super Admin access denied" });
    }
    next();
});
export {
    protect,
    userMiddleware,
    adminMiddleware,
    superAdminMiddleware,
    authorizeRoles,
};
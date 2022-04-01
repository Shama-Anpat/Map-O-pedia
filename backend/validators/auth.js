import { check, validationResult } from "express-validator";
const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const validateSignupRequest = [
    check("firstName").notEmpty().withMessage("firstName is required"),
    check("lastName").notEmpty().withMessage("lastName is required"),
    check("lastName"),
    check("email")
    .isEmail()
    .matches(regex)
    .withMessage("Valid Email is required"),
    check("password")
    .not()
    .isIn(["123", "password", "god"])
    .withMessage("Do not use a common word as the password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

const validateadminSignupRequest = [
    check("firstName").notEmpty().withMessage("firstName is required"),
    check("lastName").notEmpty().withMessage("lastName is required"),
    check("email")
    .isEmail()
    .matches(regex)
    .withMessage("Valid Email is required"),
    check("password")
    .not()
    .isIn(["123", "password", "god"])
    .withMessage("Do not use a common word as the password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
    check("proof").notEmpty().withMessage("proof is required"),
];

const validateSigninRequest = [
    check("email").isEmail().withMessage("Valid Email is required"),
    check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
};

export {
    validateSignupRequest,
    validateSigninRequest,
    validateadminSignupRequest,
    isRequestValidated,
};
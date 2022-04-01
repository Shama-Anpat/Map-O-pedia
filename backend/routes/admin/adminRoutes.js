import express from "express";
import {
    authAdmin,
    registerAdmin,
    updateAdminProfile,
} from "../../controllers/admin/adminController.js";
import { protect } from "../../middleware/authMiddleware.js";
import {
    validateadminSignupRequest,
    isRequestValidated,
    validateSigninRequest,
} from "../../validators/auth.js";
const router = express.Router();

router
    .route("/register")
    .post(registerAdmin, validateadminSignupRequest, isRequestValidated);
router.post("/login", authAdmin, validateSigninRequest, isRequestValidated);
router.route("/profile").post(protect, updateAdminProfile);

export default router;
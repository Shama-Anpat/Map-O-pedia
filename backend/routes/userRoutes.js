import express from "express";
import {
    authUser,
    registerUser,
    registerAdmin,
    updateUserProfile,
    updateAdminProfile,
    forgotPassword,
    resetPassword,
    logout,
    updatePassword,
    getUserDetails,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
} from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
// import {
//     validateSignupRequest,
//     validateadminSignupRequest,
//     isRequestValidated,
//     validateSigninRequest,
// } from "../validators/auth.js";
const router = express.Router();

//user
router.route("/register").post(registerUser);
router.route("/me/update").put(protect, updateUserProfile);

// common for all

router.route("/login").post(authUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/password/update").put(protect, updatePassword);
router.route("/me").get(protect, getUserDetails);

//admin
router.route("/admin/register").post(registerAdmin);
router.route("/me/admin").put(protect, updateAdminProfile);

//super admin
router
    .route("/superadmin/users")
    .get(protect, authorizeRoles("superadmin"), getAllUser);

router
    .route("/superadmin/user/:id")
    .get(protect, authorizeRoles("superadmin"), getSingleUser)
    .put(protect, authorizeRoles("superadmin"), updateUserRole)
    .delete(protect, authorizeRoles("superadmin"), deleteUser);

export default router;
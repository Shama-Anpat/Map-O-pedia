import express from "express";
import {
    getAllPins,
    getPinDetailsById,
    CreatePin,
    DeletePin,
    UpdatePin,
    createPinReview,
    getPinReviews,
    deleteReview,
    getAdminPins,
} from "../controllers/pinController.js";
const router = express.Router();
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

router.route("/pins").get(getAllPins);

router
    .route("/admin/pins")
    .get(protect, authorizeRoles("superadmin", "admin"), getAdminPins);

router
    .route("/admin/create/new")
    .post(protect, authorizeRoles("superadmin", "admin"), CreatePin);

router
    .route("/admin/pin/:id")
    .put(protect, authorizeRoles("superadmin", "admin"), UpdatePin)
    .delete(protect, authorizeRoles("superadmin", "admin"), DeletePin);

router.route("/pindetails/:id").get(getPinDetailsById);

router.route("/review/new").put(protect, createPinReview);
router.route("/reviews").get(getPinReviews).delete(protect, deleteReview);

export default router;
import express from "express";
import {
    getPinById,
    getPins,
    CreatePin,
    DeletePin,
    UpdatePin,
} from "../controllers/pinController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getPins);
router
    .route("/:id")
    .get(getPinById)
    .delete(protect, DeletePin)
    .put(protect, UpdatePin);
router.route("/create").post(protect, CreatePin);

export default router;
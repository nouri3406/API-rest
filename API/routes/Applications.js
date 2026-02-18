import express from "express";
import { verifyToken } from "../middleware/authentificationJwt.js"; // adapte le chemin exact
import {
  applyToAdvertisements,
  getMyApplications,
  getReceivedApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../Controllers/ApplicationsController.js";

const router = express.Router();

router.post("/", verifyToken, applyToAdvertisements);
router.get("/me", verifyToken, getMyApplications);
router.get("/received", verifyToken, getReceivedApplications);
router.put("/:id/status", verifyToken, updateApplicationStatus);
router.delete("/:id", verifyToken, deleteApplication);

export default router;
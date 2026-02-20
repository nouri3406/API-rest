import express from "express";
import { verifyToken } from "../middleware/authentificationJwt.js"; 
import {
  applyToAdvertisements,
  getMyApplications,
  getReceivedApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../Controllers/ApplicationsController.js";

const router = express.Router();

/**
 * @openapi
 * /Applications:
 *   post:
 *     summary: Post Application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Post successfull
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, applyToAdvertisements);

/**
 * @openapi
 * /applications/me:
 *   get:
 *     summary: Get applications of the authenticated user
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of your applications
 *       401:
 *         description: Unauthorized
 */
router.get("/me", verifyToken, getMyApplications);

/**
 * @openapi
 * /applications/received:
 *   get:
 *     summary: Get applications received by a company
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of received applications
 *       401:
 *         description: Unauthorized
 */
router.get("/received", verifyToken, getReceivedApplications);

/**
 * @openapi
 * /Applications:
 *   put:
 *     summary: update Application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Update successfull
 *       401:
 *         description: Unauthorized
 */
router.put("/:id/status", verifyToken, updateApplicationStatus);

/**
 * @openapi
 * /Applications:
 *   delete:
 *     summary: Delete Application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Deleted successfull
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", verifyToken, deleteApplication);

export default router;
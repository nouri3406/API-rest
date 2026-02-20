import express from "express";
import {
  createCompanies,
  deleteCompanies,
  getAllCompanies,
  getCompanies,
  updateCompanies,
} from "../Controllers/CompaniesController.js";

import { verifyToken, validateRequest, isCompanyOwner } from "../middleware/authentificationJwt.js";
import { CreateCompanySchema, UpdateCompanySchema } from "../Validator/CompaniesValidate.js";

const router = express.Router();

/**
 * @openapi
 * /Companies/{id}:
 *   get:
 *     summary: Get a companie by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the companie
 *     responses:
 *       200:
 *         description: companie found
 *       404:
 *         description: companie not found
 */
router.get("/Companies/:id", getCompanies);

/**
 * @openapi
 * /Companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Success
 *         404:
 *         description: Companies not found
 */
router.get("/Companies", getAllCompanies);

/**
 * @openapi
 * /Companies:
 *   post:
 *     summary: Post Companie
 *     tags: [Companies]
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
router.post("/Companies", verifyToken, validateRequest(CreateCompanySchema), createCompanies);

/**
 * @openapi
 * /Companies:
 *   put:
 *     summary: update Companie
 *     tags: [Companies]
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
router.put("/Companies/:id", verifyToken, isCompanyOwner, validateRequest(UpdateCompanySchema), updateCompanies);

/**
 * @openapi
 * /Companies:
 *   delete:
 *     summary: Delete Companie
 *     tags: [Companies]
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
router.delete("/Companies/:id", verifyToken, isCompanyOwner, deleteCompanies);

export default router;
import express from "express";
import {
  createPeople,
  deletePeople,
  getAllPeople,
  getPeople,
  updatePeople,
} from "../Controllers/PeopleController.js";

import { verifyToken, validateRequest, isPeopleOwner } from "../middleware/authentificationJwt.js";
import { CreatePeopleSchema, UpdatePeopleSchema } from "../Validator/peopleValidate.js";

const router = express.Router();

/**
 * @openapi
 * /People/{id}:
 *   get:
 *     summary: Get a person by ID
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the person
 *     responses:
 *       200:
 *         description: Person found
 *       404:
 *         description: Person not found
 */
router.get("/People/:id", getPeople);

/**
 * @openapi
 * /People:
 *   get:
 *     summary: Get all People
 *     tags: [People]
 *     responses:
 *       200:
 *         description: Success
 *         404:
 *         description: Person not found
 */
router.get("/People", getAllPeople);

/**
 * @openapi
 * /People:
 *   post:
 *     summary: Post People
 *     tags: [People]
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
 *         description: Post
 *       401:
 *         description: Unauthorized
 */
router.post("/People", verifyToken, validateRequest(CreatePeopleSchema), createPeople);

/**
 * @openapi
 * /People:
 *   put:
 *     summary: update People
 *     tags: [People]
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
 *         description: Update
 *       401:
 *         description: Unauthorized
 */
router.put("/People/:id", verifyToken, isPeopleOwner, validateRequest(UpdatePeopleSchema), updatePeople);

/**
 * @openapi
 * /People:
 *   delete:
 *     summary: Delete People
 *     tags: [People]
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
 *         description: Deleted
 *       401:
 *         description: Unauthorized
 */
router.delete("/People/:id", verifyToken, isPeopleOwner, deletePeople);

export default router;

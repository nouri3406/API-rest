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

router.get("/People/:id", getPeople);

router.post("/People", verifyToken, validateRequest(CreatePeopleSchema), createPeople);
router.put("/People/:id", verifyToken, isPeopleOwner, validateRequest(UpdatePeopleSchema), updatePeople);
router.delete("/People/:id", verifyToken, isPeopleOwner, deletePeople);

export default router;

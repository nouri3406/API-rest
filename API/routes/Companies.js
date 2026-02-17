import express from "express";
import {
  createCompanies,
  deleteCompanies,
  getAllCompanies,
  getCompanies,
  updateCompanies,
} from "../Controllers/CompaniesController.js";

import { verifyToken, validateRequest, isCompanyOwner } from "../Middlewares/AuthMiddleware.js";
import { CreateCompanySchema, UpdateCompanySchema } from "../Validators/CompaniesValidator.js";

const router = express.Router();

router.get("/Companies/:id", getCompanies);

router.post("/Companies", verifyToken, validateRequest(CreateCompanySchema), createCompanies);
router.put("/Companies/:id", verifyToken, isCompanyOwner, validateRequest(UpdateCompanySchema), updateCompanies);
router.delete("/Companies/:id", verifyToken, isCompanyOwner, deleteCompanies);

export default router;
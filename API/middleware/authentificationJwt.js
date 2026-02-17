import jwt from "jsonwebtoken";
import { getAdvertisementOwnerId } from "../Models/AdvertisementsModel.js";
import { getCompanyOwnerIdService } from "../Models/CompaniesModel.js";
import { getPeopleOwnerIdService } from "../Models/PeopleModel.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const isOwner = async (req, res, next) => {
  try {
    const userIdFromToken = req.user.id;
    const adId = req.params.id;

    const ownerId = await getAdvertisementOwnerId(adId);
    if (!ownerId) return res.status(404).json({ message: "Advertisement not found" });

    if (ownerId === userIdFromToken || req.user.role === "admin") return next();

    return res.status(403).json({ message: "Access denied" });
  } catch (error) {
    next(error);
  }
};

export const isCompanyOwner = async (req, res, next) => {
  try {
    const userIdFromToken = req.user.id;
    const companyId = req.params.id;

    const ownerId = await getCompanyOwnerIdService(companyId);
    if (!ownerId) return res.status(404).json({ message: "Company not found" });

    if (ownerId === userIdFromToken || req.user.role === "admin") return next();

    return res.status(403).json({ message: "Access denied" });
  } catch (error) {
    next(error);
  }
};

export const isPeopleOwner = async (req, res, next) => {
  try {
    const userIdFromToken = req.user.id;
    const peopleId = req.params.id;

    const ownerId = await getPeopleOwnerIdService(peopleId);
    if (!ownerId) return res.status(404).json({ message: "Profile not found" });

    if (ownerId === userIdFromToken || req.user.role === "admin") return next();

    return res.status(403).json({ message: "Access denied" });
  } catch (error) {
    next(error);
  }
};

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        status: 400,
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }

    req.body = value;
    next();
  };
};

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message || "Oups, un problème est survenu",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
};

export default globalErrorHandler;

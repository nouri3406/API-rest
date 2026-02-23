import jwt from "jsonwebtoken";
import { getAdvertisementOwnerId } from "../Models/AdvertisementsModel.js";
import { getCompanyOwnerIdService } from "../Models/CompaniesModel.js";
import { getPeopleOwnerIdService } from "../Models/PeopleModel.js";

export const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Access denied" });

  const [scheme, token] = auth.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
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
    return next(error);
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
    return next(error);
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
    return next(error);
  }
};
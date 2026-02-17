import jwt from "jsonwebtoken";
import { getAdvertisementOwnerId } from "../Models/AdvertisementsModel.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Accès refusé" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Token invalide" });
    }
};

export const isOwner = async (req, res, next) => {
    try {
        const userIdFromToken = req.user.id;
        const adId = req.params.id;
        const ownerId = await getAdvertisementOwnerId(adId);

        if (!ownerId) return res.status(404).json({ message: "Annonce introuvable" });

        if (ownerId === userIdFromToken || req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Accès interdit" });
        }
    } catch (error) {
        next(error);
    }
};
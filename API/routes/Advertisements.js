import express from "express";
import { 
    createAdvertisements, 
    deleteAdvertisements, 
    getAllAdvertisements, 
    updateAdvertisements, 
    getAdvertisementsByCity, 
    getAdvertisementsByBusinessSector 
} from "../Controllers/AdvertisementsController.js";
import { verifyToken, isOwner } from "./middleware/authentificationJwt.js";
import { validateRequest } from "./middleware/validateRequest.js";
import { AdvertisementsSchema } from "./Validator/AdvertisementsValidate.js";

const router = express.Router();

router.get("/Advertisements", getAllAdvertisements);
router.get("/Advertisements/city/:city", getAdvertisementsByCity);
router.get("/Advertisements/sector/:business_sector", getAdvertisementsByBusinessSector);

router.post("/Advertisements", 
    verifyToken, 
    validateRequest(AdvertisementsSchema), 
    createAdvertisements
);

router.put("/Advertisements/:id", 
    verifyToken, 
    isOwner, 
    validateRequest(AdvertisementsSchema), 
    updateAdvertisements
);

router.delete("/Advertisements/:id", 
    verifyToken, 
    isOwner, 
    deleteAdvertisements
);

export default router;
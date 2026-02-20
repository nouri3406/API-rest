import express from "express";
import { 
    createAdvertisements, 
    deleteAdvertisements, 
    getAllAdvertisements, 
    updateAdvertisements, 
    getAdvertisementsByCity, 
    getAdvertisementsByBusinessSector 
} from "../Controllers/AdvertisementsController.js";
import { verifyToken, isOwner } from "../middleware/authentificationJwt.js";
import { validateRequest } from "../middleware/ValidateRequest.js";
import { AdvertisementsSchema } from "../Validator/AdvertisementsValidate.js";

const router = express.Router();

/**
 * @openapi
 * /Advertisements:
 *   get:
 *     summary: Get all advertisements
 *     tags: [Advertisements]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/Advertisements", getAllAdvertisements);

/**
 * @openapi
 * /Advertisements/city/{city}:
 *   get:
 *     summary: Get advertisements by city
 *     tags: [Advertisements]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: No ads found
 */

router.get("/Advertisements/city/:city", getAdvertisementsByCity);

/**
 * @openapi
 * /Advertisements/sector/{business_sector}:
 *   get:
 *     summary: Get advertisements by sector
 *     tags: [Advertisements]
 *     parameters:
 *       - in: path
 *         name: business_sector
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: No ads found
 */
router.get("/Advertisements/sector/:business_sector", getAdvertisementsByBusinessSector);

/**
 * @openapi
 * /Advertisements:
 *   post:
 *     summary: Post advertisement
 *     tags: [Advertisements]
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
router.post("/Advertisements",  verifyToken, validateRequest(AdvertisementsSchema), createAdvertisements);

/**
 * @openapi
 * /Advertisements:
 *   put:
 *     summary: update advertisement
 *     tags: [Advertisements]
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
router.put("/Advertisements/:id", verifyToken, isOwner, validateRequest(AdvertisementsSchema), updateAdvertisements );

/**
 * @openapi
 * /Advertisements:
 *   delete:
 *     summary: Delete advertisement
 *     tags: [Advertisements]
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
router.delete("/Advertisements/:id", 
    verifyToken, 
    isOwner, 
    deleteAdvertisements
);

export default router;
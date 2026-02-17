import { 
    getAllAdvertisementsService, 
    getAdvertisementsByBusinessSectorService,
    getAdvertisementsByCityService,
    createAdvertisementsService, 
    updateAdvertisementsByIdService, 
    deleteAdvertisementsByIdService
} from "../Models/AdvertisementsModel.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({ status, message, data });
};

export const getAllAdvertisements = async (req, res, next) => {
    try {
        const ads = await getAllAdvertisementsService();
        handleResponse(res, 200, "Success", ads);
    } catch (error) { next(error); }
};

export const getAdvertisementsByBusinessSector = async (req, res, next) => {
    try {
        const sector = req.params.business_sector;
        const adsFound = await getAdvertisementsByBusinessSectorService(sector);
        
        if (!adsFound || adsFound.length === 0) {
            return handleResponse(res, 404, "No ads found in this sector");
        }
        handleResponse(res, 200, "Success", adsFound);
    } catch (error) { next(error); }
};

export const getAdvertisementsByCity = async (req, res, next) => {
    try {
        const city = req.params.city;
        const adsInCity = await getAdvertisementsByCityService(city);
        
        if (!adsInCity || adsInCity.length === 0) {
            return handleResponse(res, 404, "No ads found in this city");
        }
        handleResponse(res, 200, "Success", adsInCity);
    } catch (error) { next(error); }
};

// --- ACTIONS ---

export const createAdvertisements = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const newAd = await createAdvertisementsService(req.body, userId);
        handleResponse(res, 201, "Created", newAd);
    } catch (error) { next(error); }
};

export const updateAdvertisements = async (req, res, next) => {
    try {
        const adId = req.params.id;
        const updatedAd = await updateAdvertisementsByIdService(adId, req.body);
        
        if (!updatedAd) return handleResponse(res, 404, "Ad not found");
        handleResponse(res, 200, "Updated", updatedAd);
    } catch (error) { next(error); }
};

export const deleteAdvertisements = async (req, res, next) => {
    try {
        const adId = req.params.id;
        const deletedAd = await deleteAdvertisementsByIdService(adId);
        
        if (!deletedAd) return handleResponse(res, 404, "Ad not found");
        handleResponse(res, 200, "Deleted", deletedAd);
    } catch (error) { next(error); }
};
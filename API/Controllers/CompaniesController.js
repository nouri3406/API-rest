import {
  getAllCompaniesService,
  getCompaniesByIdService,
  createCompaniesService,
  updateCompaniesByIdService,
  deleteCompaniesByIdService,
} from "../Models/CompaniesModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const getAllCompanies = async (req, res, next) => {
  try {
    const allCompanies = await getAllCompaniesService();
    return handleResponse(res, 200, "Companies fetched successfully", allCompanies);
  } catch (error) {
    next(error);
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const company = await getCompaniesByIdService(req.params.id);
    if (!company) return handleResponse(res, 404, "Company not found");
    return handleResponse(res, 200, "Company fetched successfully", company);
  } catch (error) {
    next(error);
  }
};

export const createCompanies = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const newCompany = await createCompaniesService(req.body, userId);
    return handleResponse(res, 201, "Company created successfully", newCompany);
  } catch (error) {
    next(error);
  }
};

export const updateCompanies = async (req, res, next) => {
  try {
    const updatedCompany = await updateCompaniesByIdService(req.params.id, req.body);
    if (!updatedCompany) return handleResponse(res, 404, "Company not found");
    return handleResponse(res, 200, "Company updated successfully", updatedCompany);
  } catch (error) {
    next(error);
  }
};

export const deleteCompanies = async (req, res, next) => {
  try {
    const deletedCompany = await deleteCompaniesByIdService(req.params.id);
    if (!deletedCompany) return handleResponse(res, 404, "Company not found");
    return handleResponse(res, 200, "Company deleted successfully", deletedCompany);
  } catch (error) {
    next(error);
  }
};
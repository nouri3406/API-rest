import {
  getAllPeopleService,
  getPeopleByIdService,
  createPeopleService,
  updatePeopleByIdService,
  deletePeopleByIdService,
} from "../Models/PeopleModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const getAllPeople = async (req, res, next) => {
  try {
    const allPeoples = await getAllPeopleService();
    return handleResponse(res, 200, "People fetched successfully", allPeoples);
  } catch (error) {
    next(error);
  }
};

export const getPeople = async (req, res, next) => {
  try {
    const people = await getPeopleByIdService(req.params.id);
    if (!people) return handleResponse(res, 404, "People not found");
    return handleResponse(res, 200, "People fetched successfully", people);
  } catch (error) {
    next(error);
  }
};

export const createPeople = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const newPeople = await createPeopleService(req.body, userId);
    return handleResponse(res, 201, "People created successfully", newPeople);
  } catch (error) {
    next(error);
  }
};

export const updatePeople = async (req, res, next) => {
  try {
    const updatedPeople = await updatePeopleByIdService(req.params.id, req.body);
    if (!updatedPeople) return handleResponse(res, 404, "People not found");
    return handleResponse(res, 200, "People updated successfully", updatedPeople);
  } catch (error) {
    next(error);
  }
};

export const deletePeople = async (req, res, next) => {
  try {
    const deletedPeople = await deletePeopleByIdService(req.params.id);
    if (!deletedPeople) return handleResponse(res, 404, "People not found");
    return handleResponse(res, 200, "People deleted successfully", deletedPeople);
  } catch (error) {
    next(error);
  }
};

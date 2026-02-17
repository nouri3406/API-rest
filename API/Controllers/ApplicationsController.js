import {
  createApplicationService,
  getApplicationsByUserService,
  getApplicationsReceivedService,
  updateApplicationStatusService,
  deleteApplicationByIdService,
  getApplicationOwnerIdService,
} from "../Models/ApplicationsModel.js";

import {
  CreateApplicationSchema,
  UpdateApplicationStatusSchema,
} from "../Validators/ApplicationsValidator.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const applyToAdvertisements = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { error, value } = CreateApplicationSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return handleResponse(res, 400, "Validation error", error.details.map((d) => d.message)
      );
    }

    const newApplication = await createApplicationService(value, userId);
    return handleResponse(res, 201, "Application successfully submitted", newApplication);
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const myApplications = await getApplicationsByUserService(userId);
    return handleResponse(res, 200, "List of your applications", myApplications);
  } catch (error) {
    next(error);
  }
};

export const getReceivedApplications = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const receivedApps = await getApplicationsReceivedService(ownerId);
    return handleResponse(res, 200, "Applications received for your advertisements", receivedApps);
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const applicationId = req.params.id;
   
    const ownerId = await getApplicationOwnerIdService(applicationId);
    if (!ownerId) return handleResponse(res, 404, "Application not found");

    if (ownerId !== req.user.id && req.user.role !== "admin") {
      return handleResponse(res, 403, "Forbidden");
    }

    const { error, value } = UpdateApplicationStatusSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return handleResponse(res, 400, "Validation error", error.details.map((d) => d.message)
      );
    }

    const updatedApplication = await updateApplicationStatusService(
      applicationId,
      value.application_status
    );

    if (!updatedApplication) {
      return handleResponse(res, 404, "Application not found");
    }

    return handleResponse(res, 200, "Application updated successfully", updatedApplication);
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const applicationId = req.params.id;
   
    const deletedApplication = await deleteApplicationByIdService(applicationId);

    if (!deletedApplication) {
      return handleResponse(res, 404, "Application not found");
    }

    return handleResponse(res, 200, "Application cancelled", deletedApplication);
  } catch (error) {
    next(error);
  }
};
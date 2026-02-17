import pool from "../Config/DataBase.js";

export const createApplicationService = async (data, userId) => {
  const { name, mail, cover_letter, advertisement_id } = data;

  const result = await pool.query(
    `INSERT INTO Applications (name, mail, cover_letter, advertisement_id, user_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, mail, cover_letter, advertisement_id, userId]
  );

  return result.rows[0];
};

export const getApplicationsByUserService = async (userId) => {
  const result = await pool.query(
    `SELECT *
     FROM Applications
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

export const getApplicationsReceivedService = async (ownerId) => {
  const result = await pool.query(
    `SELECT
        app.id AS application_id,
        app.name AS candidate_name,
        app.mail AS candidate_email,
        app.cover_letter,
        app.application_status,
        app.created_at AS applied_at,
        ads.job_name AS position
     FROM Applications app
     JOIN Advertisements ads ON app.advertisement_id = ads.id
     WHERE ads.user_id = $1
     ORDER BY app.created_at DESC`,
    [ownerId]
  );

  return result.rows;
};

export const updateApplicationStatusService = async (applicationId, status) => {
  const result = await pool.query(
    `UPDATE Applications
     SET application_status = $1
     WHERE id = $2
     RETURNING *`,
    [status, applicationId]
  );
  return result.rows[0];
};

export const deleteApplicationByIdService = async (applicationId) => {
  const result = await pool.query(
    `DELETE FROM Applications
     WHERE id = $1
     RETURNING *`,
    [applicationId]
  );
  return result.rows[0];
};

export const getApplicationOwnerIdService = async (applicationId) => {
  const result = await pool.query(
    `SELECT ads.user_id AS owner_id
     FROM Applications app
     JOIN Advertisements ads ON app.advertisement_id = ads.id
     WHERE app.id = $1`,
    [applicationId]
  );

  return result.rows[0]?.owner_id;
};

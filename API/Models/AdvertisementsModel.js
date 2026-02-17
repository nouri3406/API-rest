import pool from "../Config/DataBase.js";

export const getAllAdvertisementsService = async () => {
  const result = await pool.query("SELECT * FROM Advertisements ORDER BY created_at DESC");
  return result.rows;
};

export const getAdvertisementsByBusinessSectorService = async (business_sector) => {
  const result = await pool.query(
    "SELECT * FROM Advertisements WHERE business_sector = $1 ORDER BY created_at DESC",
    [business_sector]
  );
  return result.rows;
};

export const getAdvertisementsByCityService = async (city) => {
  const result = await pool.query(
    "SELECT * FROM Advertisements WHERE city = $1 ORDER BY created_at DESC",
    [city]
  );
  return result.rows;
};

export const createAdvertisementsService = async (data, userId) => {
  const { company_name, job_name, contract_type, business_sector, salary, city, adress, description } = data;
  const result = await pool.query(
    `INSERT INTO Advertisements (company_name, job_name, contract_type, business_sector, salary, city, adress, description, user_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [company_name, job_name, contract_type, business_sector, salary, city, adress, description, userId]
  );
  return result.rows[0];
};

export const updateAdvertisementsByIdService = async (id, data) => {
  const { company_name, job_name, contract_type, business_sector, salary, city, adress, description } = data;
  const result = await pool.query(
    `UPDATE Advertisements
     SET company_name = $2, job_name = $3, contract_type = $4, business_sector = $5, salary = $6, city = $7, adress = $8, description = $9
     WHERE id = $1
     RETURNING *`,
    [id, company_name, job_name, contract_type, business_sector, salary, city, adress, description]
  );
  return result.rows[0];
};

export const deleteAdvertisementsByIdService = async (id) => {
  const result = await pool.query("DELETE FROM Advertisements WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

export const getAdvertisementOwnerId = async (id) => {
    const result = await pool.query("SELECT user_id FROM Advertisements WHERE id = $1", [id]);
    return result.rows[0]?.user_id;
};
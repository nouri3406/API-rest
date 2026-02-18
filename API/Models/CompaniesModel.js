import pool from "../Config/DataBase.js";

export const getAllCompaniesService = async () => {
  const result = await pool.query("SELECT * FROM Companies ORDER BY created_at DESC");
  return result.rows;
};

export const getCompaniesByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM Companies WHERE id = $1", [id]);
  return result.rows[0];
};

export const getCompanyOwnerIdService = async (id) => {
  const result = await pool.query("SELECT user_id FROM Companies WHERE id = $1", [id]);
  return result.rows[0]?.user_id;
};

export const createCompaniesService = async (data, userId) => {
  const { name, siret, mail, password, business_sector, headquarters, web_site, description } = data;

  const result = await pool.query(
    `INSERT INTO Companies (name, siret, mail, password, business_sector, headquarters, web_site, description, user_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [name, siret, mail, password, business_sector, headquarters, web_site, description, userId]
  );

  return result.rows[0];
};

export const updateCompaniesByIdService = async (id, data) => {
  const keys = Object.keys(data);
  if (keys.length === 0) return null;
  
  const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = [id, ...keys.map((k) => data[k])];

  const result = await pool.query(
    `UPDATE Companies
     SET ${setClause}
     WHERE id = $1
     RETURNING *`,
    values
  );

  return result.rows[0];
};

export const deleteCompaniesByIdService = async (id) => {
  const result = await pool.query("DELETE FROM Companies WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

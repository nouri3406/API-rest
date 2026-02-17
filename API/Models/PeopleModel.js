import pool from "../Config/DataBase.js";

export const getAllPeopleService = async () => {
  const result = await pool.query("SELECT * FROM People ORDER BY created_at DESC");
  return result.rows;
};

export const getPeopleByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM People WHERE id = $1", [id]);
  return result.rows[0];
};

export const getPeopleOwnerIdService = async (id) => {
  const result = await pool.query("SELECT user_id FROM People WHERE id = $1", [id]);
  return result.rows[0]?.user_id;
};

export const createPeopleService = async (data, userId) => {
  const { name, first_name, phone_number, mail, password, adress, city } = data;

  const result = await pool.query(
    `INSERT INTO People (name, first_name, phone_number, mail, password, adress, city, user_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [name, first_name, phone_number, mail, password, adress, city, userId]
  );

  return result.rows[0];
};

export const updatePeopleByIdService = async (id, data) => {
  const keys = Object.keys(data);
  if (keys.length === 0) return null;

  const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = [id, ...keys.map((k) => data[k])];

  const result = await pool.query(
    `UPDATE People
     SET ${setClause}
     WHERE id = $1
     RETURNING *`,
    values
  );

  return result.rows[0];
};

export const deletePeopleByIdService = async (id) => {
  const result = await pool.query("DELETE FROM People WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};
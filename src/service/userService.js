import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

let connection;

const initConnection = async() => {
    connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
}

const start = async () => {
  await initConnection();
};

start();
// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashPassword(password);

  try {
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
      [email, hashPass, username]
    );
  } catch (err) {
    console.log(">>> check error: ", err);
  }
};

const getUserList = async () => {
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");

    return rows;
  } catch (err) {
    console.log(">>>check error:", err);
  }
};

const deleteUser = async (id) => {
  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM users WHERE id=?",
      [id]
    );

    return rows;
  } catch (err) {
    console.log(">>>check error:", err);
  }
};

const getUserById = async(id) => {
  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM users WHERE id=?",
      [id]
    );

    return rows;
  } catch (err) {
    console.log(">>>check error:", err);
  }
}

const updateUserInfor = async(email, username, id) => {
    try {
    const [rows, fields] = await connection.execute(
      "UPDATE users SET email=?, username=? WHERE id=? ",
      [email, username, id]
    );

    return rows;
  } catch (err) {
    console.log(">>>check error:", err);
  }
}

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor
};

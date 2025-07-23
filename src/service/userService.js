import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = (email, password, username) => {
  let hashPasss = hashPassword(password);
  connection.query(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, hashPasss, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  let users = [];
  //   connection.query("SELECT * FROM users", function (err, results, fields) {
  //     if (err) {
  //       console.log(err);
  //       return users;
  //     }

  //     users = results;
  //     console.log(">>> run user list: ", users);
  //     return users;
  //   });
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");

    return rows;
  } catch (err) {
    console.log(">>>check error:", err);
  }
};

module.exports = {
  createNewUser,
  getUserList,
};

import bcrypt from "bcryptjs";
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

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

const getUserList = () => {
    let users = [];
    connection.query(
    "SELECT * FROM users",
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      console.log(">>> check result: ", results);
    }
  );
}

module.exports = {
    createNewUser,
    getUserList
}

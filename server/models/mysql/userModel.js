import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  passwoard: "",
  database: "usersdb",
};

const connection = await mysql.createConnection(config);

export class UserModel {
  static getUsers = async () => {
    //esto es porque devuelve un array de dos posiciones, por lo tanto solo quiero el primero
    const [result] = await connection.query(
      `SELECT BIN_TO_UUID(user_id) user_id, user_firstName, user_lastName, user_maidenName, user_age, user_gender, user_email, user_phone, user_username, user_birthDate, user_image, user_height, user_weight, user_eyeColor, user_hair_type, user_hair_color, user_university, user_rol FROM users`
    );
    return result;
  };

  static getUser = async (id) => {
    const [result] = await connection.query(
      `SELECT BIN_TO_UUID(user_id) user_id, user_firstName, user_lastName, user_maidenName, user_age, user_gender, user_email, user_phone, user_username, user_birthDate, user_image, user_height, user_weight, user_eyeColor, user_hair_type, user_hair_color, user_university, user_rol FROM users WHERE user_id = UUID_TO_BIN(?);`,
      [id]
    );

    return result;
  };

  static getUserFirstName = async (firstName) => {
    const lowerCasefirstName = firstName.toLowerCase();
    const [result] = await connection.query(
      `SELECT BIN_TO_UUID(user_id) user_id, user_firstName, user_lastName, user_maidenName, user_age, user_gender, user_email, user_phone, user_username, user_birthDate, user_image, user_height, user_weight, user_eyeColor, user_hair_type, user_hair_color, user_university, user_rol FROM users WHERE LOWER(user_firstName) = ?;`,
      [lowerCasefirstName]
    );

    return result;
  };

  static createUser = (user) => {};

  static updateUser = (id, updateUser) => {};

  static deleteUser = (id) => {};
}

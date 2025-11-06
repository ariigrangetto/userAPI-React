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

  static createUser = async (user) => {
    console.log(typeof user);
    const {
      firstName,
      lastName,
      maidenName,
      age,
      gender,
      email,
      phone,
      username,
      password,
      birthDate,
      image,
      height,
      weight,
      eyeColor,
      hair,
      university,
      role,
    } = user;

    //para poder obtener el id porque por más que sea random y que se puede generar solo, luego es imposible poder recuperarlo;

    //llamando a sql para generar el uuid;
    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `
      INSERT INTO users (user_id, user_firstName, user_lastName, user_maidenName, user_age, user_gender, user_email, user_phone, user_username, user_password, user_birthDate, user_image, user_height, user_weight, user_eyeColor, user_hair_type, user_hair_color, user_university, user_rol)
      VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          uuid,
          firstName,
          lastName,
          maidenName,
          age,
          gender,
          email,
          phone,
          username,
          password,
          birthDate,
          image,
          height,
          weight,
          eyeColor,
          hair?.type,
          hair?.color,
          university,
          role,
        ]
      );
    } catch (e) {
      //evitar mandar informacion sensible al usuario
      throw new Error("Error creating new user: " + e.message);
    }

    const [userCreated] = await connection.query(
      `SELECT BIN_TO_UUID(user_id) user_id, user_firstName, user_lastName, user_maidenName, user_age, user_gender, user_email, user_phone, user_username, user_password, user_birthDate, user_image, user_height, user_weight, user_eyeColor, user_hair_type, user_hair_color, user_university, user_rol FROM users WHERE user_id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return userCreated;
  };

  static updateUser = async (id, updateUser) => {
    const filterUpdatedElements = Object.entries(updateUser).filter(
      ([key]) => updateUser[key] !== undefined
    );

    const setValue = filterUpdatedElements
      .map(([key]) => `user_${key} = ?`)
      .join(", ");
    console.log(setValue);

    const values = filterUpdatedElements.map(([_, value]) => value);

    try {
      await connection.query(
        `
      UPDATE users
      SET ${setValue}
      WHERE user_id = UUID_TO_BIN(?);
      `,
        [...values, id]
      );
    } catch (e) {
      throw new Error("Error updating user: " + e.message);
    }

    const [result] = await connection.query(
      `
      SELECT * FROM users
      WHERE user_id = UUID_TO_BIN(?);
      `,
      [id]
    );

    return result;
  };

  static deleteUser = async (id) => {
    const [result] = await connection.query(
      `DELETE FROM users
      WHERE user_id = UUID_TO_BIN(?);
      `,
      [id]
    );

    return result;
  };
}

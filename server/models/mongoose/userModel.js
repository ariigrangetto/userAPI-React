import { User } from "./userSchema.js";

export class UserModel {
  static getUsers = () => {
    return User.find({})
      .then((user) => user)
      .catch((err) => {
        console.error("Error getting users", err);
        throw err;
      });
  };
  static getUser = (id) => {
    return User.findById(id)
      .then((user) => user)
      .catch((err) => {
        console.error(`Error getting user with id: ${id}`, err);
        throw err;
      });
  };

  static getUserFirstName = (firstName) => {
    return User.find({ firstName: firstName })
      .then((user) => user)
      .catch((err) => {
        console.error(`Error searching for users with name: ${firstName}`);
        throw err;
      });
  };

  static createUser = (user) => {
    return User.create(user)
      .then((user) => user)
      .catch((err) => {
        console.error(`Error creating new user`, err);
        throw err;
      });
  };

  static updateUser = (id, updateUser) => {
    return User.findByIdAndUpdate(id, updateUser, { new: true })
      .then((user) => user)
      .catch((err) => {
        console.error(`Error finding and updating user`, err);
        throw err;
      });
  };

  static deleteUser = (id) => {
    return User.findByIdAndDelete(id)
      .then((user) => user)
      .catch((err) => {
        console.log(`Error finding and deleting user`, err);
        throw err;
      });
  };
}

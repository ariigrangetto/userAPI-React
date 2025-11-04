import users from "../../users.json" with { type: "json"};
import { randomUUID } from "crypto";

export class UserModel{
    static getUsers = () => {
        return users;
    }

    static getUser = (id) => {
        return users.find((user) => user.id === id);
    }

    static getUserName = (firstName) =>{
        return users.find((user) => user.firstName.toLowerCase() === firstName.toLowerCase());
    }

    static createUser = (user) =>{
        const id = randomUUID();
        user.id = id;
        users.push(user);
        return user;
    }

    static patchUser = (id, updateUser) => {
        const findIndex = users.findIndex((user) => user.id === id);

        if(findIndex === -1) return null;
        users[findIndex] = {
            ...users[findIndex],
            ...updateUser,
            id: users[findIndex].id
        }

        return users[findIndex];
    } 


    static deleteUser = (id) => {
        const findIndex = users.findIndex((user) => user.id === id);

        if(findIndex === -1) return null;
        const user = users.splice(findIndex, 1)[0];
        return user;
    }
}
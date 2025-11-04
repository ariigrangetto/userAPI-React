import users from "../../users.json" with { type: "json"};
import { randomUUID } from "crypto";

export class UserModel{
    static getUsers = () => {
        return users;
    }

    static getUser = (id) => {
        return users.find((user) => user.id === parseInt(id));
    }

    static getUserFirstName = (firstName) =>{
        return users.find((user) => user.firstName.toLowerCase() === firstName.toLowerCase());
    }

    static createUser = (user) =>{
        const id = randomUUID();
        user.id = id;
        users.push(user);
        return user;
    }

    static updateUser = (id, updateUser) => {
        const findIndex = users.findIndex((user) => user.id === parseInt(id));

        if(findIndex === -1) return null;
        users[findIndex] = {
            ...users[findIndex],
            ...updateUser,
            id: users[findIndex].id
        }

        return users[findIndex];
    } 


    static deleteUser = (id) => {
        const findIndex = users.findIndex((user) => user.id === parseInt(id));

        if(findIndex === -1) return null;
        const user = users.splice(findIndex, 1);
        return user;
    }
}
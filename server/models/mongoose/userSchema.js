import users from "../../users.json" with { type: "json" }
import { Schema, model } from "mongoose";

// 1. Generar el schema

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  maidenName: String,
  age: Number,
  gender: String,
  email: String,
  phone: String,
  username: String,
  password: String,
  birthDate: String,
  image: String,
  height: Number,
  weight: Number,
  eyeColor: String,
  hair: {
    type: {
      color: String,
      type: String,
    },
  },
  university: String,
  role: String,
});

// 2. Eliminar los id por defecto al igual que __v;

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// 3. Generar nuevo modelo;

export const User = model("User", userSchema); 

const insertUsers = async () =>{
    try{
        const result = await User.insertMany(users);
        console.log(`${result.length} usuarios insertados`);
    }catch(err){
        console.error(`Error inserting users ${err}`);
    }
}

insertUsers();



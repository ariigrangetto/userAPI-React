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
  bloodGroup: String,
  height: Number,
  weight: Number,
  eyeColor: String,
  hair: {
    type: {
      color: String,
      type: String,
    },
  },
  ip: String,
  address: {
    address: String,
    city: String,
    state: String,
    stateCode: String,
    postalCode: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
    country: String,
  },
  macAddress: String,
  university: String,
  bank: {
    cardExpire: String,
    cardNumber: String,
    cardType: String,
    currency: String,
    iban: String,
  },
  company: {
    department: String,
    name: String,
    title: String,
    address: {
      address: String,
      city: String,
      state: String,
      stateCode: String,
      postalCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
      country: String,
    },
  },
  ein: String,
  ssn: String,
  userAgent: String,
  crypto: {
    coin: String,
    wallet: String,
    network: String,
  },
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



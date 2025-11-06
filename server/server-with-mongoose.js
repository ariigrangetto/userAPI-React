import { createApp } from "./users.js";
import { UserModel } from "./models/mongoose/userModel.js";
import "./models/mongoose/mongoDBConnection.js";

createApp({ userModel: UserModel });

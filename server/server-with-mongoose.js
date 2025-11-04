import { createApp } from "./users.js";
import { UserModel } from "./models/mongoose/userModel.js";

createApp({ userModel: UserModel });

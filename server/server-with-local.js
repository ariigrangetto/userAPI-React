import { UserModel } from "./models/local/userModel.js";
import { createApp } from "./users.js";

createApp({ userModel: UserModel });

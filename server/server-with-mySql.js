import { UserModel } from "./models/mysql/userModel.js";
import { createApp } from "./users.js";

createApp({ userModel: UserModel });

/* global process */
import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.MONGO_DB_URI;
if (!connectionString) {
  console.error("Could not found connection");
  process.exit(1);
}

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Closed conection with MongoDB");
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  console.log(err);
  mongoose.disconnect();
});

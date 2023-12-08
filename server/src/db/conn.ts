import mongoose from "mongoose";

const Connection: any = (URI: string) => {
  mongoose
    .connect(URI)
    .then(() => {
      console.log("db Connected successfully");
    })
    .catch((err) => {
      console.log(err)
      console.log("Failed to connect db");
    });
};

export default Connection;

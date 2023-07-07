//express & mongoose//
import express from "express"
const app = express()
import mongoose, { Schema } from "mongoose"

//env//
import * as dotenv from "dotenv"
dotenv.config()

//cookies//
import cookieParser from 'cookie-parser'
app.use(cookieParser())



//connecting DB//
const uri: string | undefined = process.env.MONGODB_URI
if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("DB connected!");
    })
    .catch((err) => console.log(err));
} else {
  console.log("uri", process.env)
  console.log("No URI to DB");
}




//static file
app.use(express.static("./client/dist"));

app.listen(3000, () => {
  console.log("server listen on port 3000");
});

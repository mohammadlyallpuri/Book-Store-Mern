import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();

//Middleware for parsing requestt body
app.use(express.json());
//Option 1: allow all orgions with default of cors
//Middleware for handling CORS
app.use(cors());
//Option 2: allow custom origins

// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methos: "GET, POST, PUT, DELETE",
//         allowedHeaders: "Content-Type",
//     })
// )


app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Hello World");
});

app.use("/books", bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to the database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

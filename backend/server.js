import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cloudinary from "cloudinary";
import path from "path";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

//Route imports
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pinsRoutes from "./routes/pinsRoutes.js";
// import adminRoutes from "./routes/admin/adminRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

//config
dotenv.config();

//connect db
connectDB();

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express(); // main thing

app.use(express.json()); // to accept json data
app.use(cookieParser()); //to use cookies

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
    express.urlencoded({
        limit: "50MB",
        extended: true,
    })
);
app.use(
    bodyParser.urlencoded({
        limit: "50MB",
        extended: true,
    })
);
app.use(fileUpload());

//use routes
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pins", pinsRoutes);
// app.use("/api/admin", adminRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
        .bold
    )
);

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
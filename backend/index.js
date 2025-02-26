//  when we use import statement then we have to use the file extension with them

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import connectDB from "./Utils/DataBaseConnect.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.routes.js";
//serve the frontend file on backend so we need the sept:1 path
import path from "path";

dotenv.config({});

// using the middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "https://job-portal-xi-six.vercel.app",
  "https://job-portal.aichchhik.xyz",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use("/api/a1/user", userRoute);
app.use("/api/a1/company", companyRoute);
app.use("/api/a1/job", jobRoute);
app.use("/api/a1/application", applicationRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  //listeen take twoo parameter one is port number and anothe is one call back function
  connectDB();
  console.log(`server is running at port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World, Backend is running");
});

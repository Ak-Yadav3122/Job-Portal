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

dotenv.config({});

// using the middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// app.use(cors({
//   origin: 'https://job-portal.aichchhik.xyz',
//   credentials: true
// }));

app.use(cors())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://job-portal.aichchhik.xyz");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // ✅ Allow credentials
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end(); // ✅ Handle preflight request
    return;
  }

  next();
});

//Creation of API'S

app.use("/api/a1/user", userRoute);
app.use("/api/a1/company", companyRoute);
app.use("/api/a1/job", jobRoute);
app.use("/api/a1/application", applicationRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log(`server is running at port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello User, Your Backend is running");
});

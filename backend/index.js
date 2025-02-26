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


app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));

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
  res.send("Hello World, Backend is running");
});

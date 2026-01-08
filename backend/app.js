
import express from  "express";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutre.js";
import bookingRoutes from "./routes/bookingRoutes.js"

import morgan from "morgan";


const app= express();

app.use(morgan("dev"))
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api",doctorRoutes);
app.use("/api/bookings",bookingRoutes);





export default app;
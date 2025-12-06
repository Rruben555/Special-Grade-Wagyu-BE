import express from "express";
import cors from "cors";
import pkg from "pg";

const app = express();
app.use(express.json());


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman, server requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));


const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Example test route
app.get("/", (req, res) => {
  res.send("Server jalan!");
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));

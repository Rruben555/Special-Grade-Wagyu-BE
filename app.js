import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import postRoutes from "./src/routes/posts.js";
import commentRoutes from "./src/routes/comments.js";
import characterRoutes from "./src/routes/characters.js";
import weaponRoutes from "./src/routes/weapons.js";


dotenv.config();


const app = express();


const allowed = (process.env.FRONTEND_URLS || "").split(",").map(s => s.trim()).filter(Boolean);


app.use(cors({
origin: function (origin, callback) {
if (!origin) return callback(null, true);
if (allowed.length === 0) return callback(null, true);
if (allowed.includes(origin) || allowed.some(a => origin.includes(a.replace("*", "")))) return callback(null, true);
callback(new Error("Not allowed by CORS"));
},
credentials: true
}));


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes prefix /api are handled by Vercel route mapping; in app we register relative paths
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/weapons", weaponRoutes);


app.get("/api/health", (req, res) => res.json({ status: "ok" }));


export default app;
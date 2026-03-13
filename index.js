import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "https://alignedwest-chiropractic-web.vercel.app"] }));

// Serve frames statically
app.use("/frames", express.static(path.join(__dirname, "frames")));

app.get("/", (req, res) => res.send("Hello from backend!"));

// Export for Vercel serverless functions
export default app;
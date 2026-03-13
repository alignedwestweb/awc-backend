const express = require("express");
const path = require("path");
const app = express();

const cors = require("cors");
app.use(cors({ origin: ["http://localhost:5173", "https://alignedwest-chiropractic-web.vercel.app"] }));

// Serve frames statically
app.use("/frames", express.static(path.join(__dirname, "frames")));

app.get("/", (req, res) => res.send("Hello from backend!"));

// Export for Vercel serverless functions
module.exports = app;
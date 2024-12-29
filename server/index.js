const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const dbConnect = require("./config/db.js");
const memberRoute = require("./routes/memberRoutes.js");
const organizationRoute = require("./routes/organizationRoutes.js");
const teamRoute = require("./routes/teamRoutes.js");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use("/api/team", teamRoute);
app.use("/api/member", memberRoute);
app.use("/api/organization", organizationRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(3245, () => {
  console.log("server is listening at", 3245);
});

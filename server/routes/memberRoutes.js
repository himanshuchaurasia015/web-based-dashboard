const express = require("express");
const { createMember, getMember } = require("../controllers/memberController");
const upload = require("../middleware/upload");
const router = express.Router();

router.route("/").post(upload, createMember).get(getMember);
module.exports = router;

const express = require("express");
const { createTeam, getTeam } = require("../controllers/teamController");
const router = express.Router();

router.route("/").post(createTeam).get(getTeam);
module.exports = router;

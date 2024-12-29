const express = require("express");
const {
  createOrganization,
  getOrganizations,
} = require("../controllers/organizationController");
const router = express.Router();

router.route("/").post(createOrganization).get(getOrganizations);
module.exports = router;

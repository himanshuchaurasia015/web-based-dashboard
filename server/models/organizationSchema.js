const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: {
    required: [true, "organization name is required"],
    type: String,
  },
  email: {
    required: [true, "organization emai is required"],
    unique: true,
    type: String,
  },
  location: {
    required: [true, "organization location is required"],
    type: String,
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});

const Organization = mongoose.model("Organization", OrganizationSchema);
module.exports = Organization;

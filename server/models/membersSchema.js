const mongoose = require("mongoose");
const Organization = require("./organizationSchema");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: "Team",
  },
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: "Organization",
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  image: String,
});

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;

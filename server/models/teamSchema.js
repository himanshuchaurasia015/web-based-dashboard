const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: {
    type: String,
  },
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: "Organization",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Member",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;

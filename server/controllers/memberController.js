const Member = require("../models/membersSchema");
const Team = require("../models/teamSchema");

const createMember = async (req, res) => {
  try {
    const { name, email, team, organization } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!name || !email || !team || !organization) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const isExist = await Member.findOne({ organization, team, email });
    if (isExist) {
      return res.status(409).json({ msg: "Member already exists" });
    }
    let status = false;
    if (image) {
      status = true;
    }
    const newMember = await Member.create({
      name,
      email,
      team,
      organization,
      image,
      status,
    });
    await Team.updateOne({ _id: team }, { $push: { members: newMember._id } });
    return res.status(201).json({ newMember });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
const getMember = (req, res) => {};

module.exports = { createMember, getMember };

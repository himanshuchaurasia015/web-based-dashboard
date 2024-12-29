const Organization = require("../models/organizationSchema.js");
const team = require("../models/teamSchema.js");

const createTeam = async (req, res) => {
  try {
    let { name, description, members, organization } = req.body;
    if (!name || !description || !organization) {
      res.status(402).json({
        msg: "all fields required",
      });
    }
    const isExist = await team.findOne({ name, organization });
    if (isExist) {
      res.status(409).json({
        msg: "Team already Exist",
      });
    }

    members = members || [];
    const newTeam = await team.create({
      name,
      description,
      members,
      organization,
    });
    await Organization.updateOne(
      { _id: organization },
      { $push: { teams: newTeam._id } }
    );
    res.status(201).json(newTeam);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong",
    });
  }
};
const getTeam = (req, res) => {};

module.exports = { getTeam, createTeam };

const organization = require("../models/organizationSchema.js");
const createOrganization = async (req, res) => {
  try {
    const { name, email, location } = req.body;
    if (!name || !email || !location) {
      return res.status(400).json({ msg: "all field are required" });
    }
    const isExist = await organization.findOne({ email });
    if (isExist) {
      res.status(409).json({
        msg: "Email already Exist",
      });
    }
    const newOrganization = await organization.create({
      name,
      email,
      location,
    });
    return res.status(201).json(newOrganization);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong",
    });
  }
};

const getOrganizations = async (req, res) => {
  try {
    const organizations = await organization
      .find()
      .populate({ path: "teams", populate: { path: "members" } });
    return res.status(200).json(organizations);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong",
    });
  }
};

module.exports = { createOrganization, getOrganizations };

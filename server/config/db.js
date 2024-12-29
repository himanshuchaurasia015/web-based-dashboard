const mongoose = require("mongoose");

const url = process.env.DB_URL;
const dbConnect = async () => {
  await mongoose.connect(url).then(() => {
    console.log("db is connected");
  });
};
module.exports = dbConnect();

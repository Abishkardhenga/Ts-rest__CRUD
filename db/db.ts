const mongoose = require("mongoose");

export const dbConnect = async () => {
  try {
    let data = await mongoose.connect(process.env.mongo_URI);
    
    console.log("Successfully connected to ", process.env.mongo_URI);
  } catch (err) {
    console.error("err",err);
  }
};


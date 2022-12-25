const mongoose = require("mongoose");
module.exports = uri => {
  mongoose.connect(uri,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  );
  const connection = mongoose.connection;
  connection.once("open", () => {
		console.log("MongoDB connection established successfully");
  });
};
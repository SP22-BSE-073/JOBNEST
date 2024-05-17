const mongoose = require("mongoose");

const databaseName = "Jobnest";

mongoose
.connect(`mongodb+srv://jobnest:mongo%40jobnest@cluster0.uuc6ity.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
  console.log(`MongoDB connection to ${databaseName} is established`);
}).catch(err => console.error('connection error: ' + err));

// mongoose.connect(`mongodb://0.0.0.0:27017/${databaseName}`).then(() => {
//   console.log(`MongoDB connection to ${databaseName} is established`);
// }).catch(err => console.error('connection error: ' + err));
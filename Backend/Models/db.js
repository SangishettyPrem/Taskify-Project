const mongoose = require('mongoose');
const ConnectionURL = process.env.DB_CONNECTION
mongoose.connect(ConnectionURL).then(() => {
    console.log("Database Connected Successfully")
}).catch((err) => {
    console.log("Error connecting: ", err);
})
const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('MongoDB Connected Successfully');
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = connectDB;
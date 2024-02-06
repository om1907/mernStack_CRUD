const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect("mongodb+srv://omkarpandey1907:0v2mEC20gJYUNmGa@cluster0.ow8tlq1.mongodb.net/mernStack_crud?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('MongoDB Connected Successfully');
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = connectDB;
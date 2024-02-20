const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database')
const User = require('./models/UserModels')
const UserLogin = require('./models/userLoginModel')
const cors = require('cors');
const dotenv = require('dotenv');
const path=require('path')

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3300;
dotenv.config();

//mongodb connection
connectDB()


//import routes
const userRoute = require('./routes/userRoutes');
const userAuthRoute = require('./routes/userAuthRoute');

// Different routes
app.use('/api', userRoute);
app.use('/api', userAuthRoute);


app.get('/', (req, res) => {
    res.send('Hello!. This is mernStack_crud App')
})

app.listen(PORT, () => {
    console.log(`Server is running : http://localhost:${PORT}`);
})


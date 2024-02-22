const express = require('express');
const connectDB = require('./config/database')
const cors = require('cors');
const dotenv = require('dotenv');

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


app.listen(PORT, () => {
    console.log(`Server is running : http://localhost:${PORT}`);
})


const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database')
const User = require('./models/UserModels')
const UserLogin = require('./models/userLoginModel')
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config({ path: '/backend/config/.env' });


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3300;

//mongodb connection
connectDB()

//userlogin
app.post('/api/userlogin', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserLogin.findOne({ email, password });
    if (user) {
        res.json({ success: true, message: 'Login successful!' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// userSignUp
app.post('/api/usersignup', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Validate input data
    if (!email || !password || !confirmPassword) {
        console.log('all fields required')
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        console.log('password didnt match');
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    try {
        const existingUser = await UserLogin.findOne({ email });
        if (existingUser) {
            console.log('existing user')
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const newUser = new UserLogin({ email, password });
        await newUser.save();
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


//create user 
app.post('/api/createuser', async (req, res) => {
    try {
        const bodyData = req.body;
        const user = new User(bodyData);
        const userData = await user.save();
        res.send(userData);


    } catch (error) {
        res.send(error);
    }
})

//getAllUserData

app.get('/api/getalluserdata', async (req, res) => {
    try {
        const userData = await User.find({});
        res.send(userData);
        // res.status(200).json({
        //     success:true,
        //     userData
        // })

    } catch (error) {
        res.send(error);
        res.status(404).json({
            success: false,
            error
        })
    }

})


//get single user data
app.get('/api/getuserData/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById({ _id: id });
        res.send(user);



    } catch (error) {
        res.send(error);
    }
})

//update user data

app.put('/api/updateuser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        res.send(user);

    } catch (error) {
        res.send(error);
    }
})

//delete user 

app.delete('/api/deleteuser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({ _id: id });
        res.send(user);

    } catch (error) {
        res.send(error);
    }
})


app.get('/', (req, res) => {
    res.send('Hello!. This is mernStack_crud App')
})


app.listen(PORT, () => {
    console.log(`Server is running : http://localhost:${PORT}`);
})


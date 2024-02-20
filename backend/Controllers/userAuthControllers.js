const UserLogin=require('../models/userLoginModel');
const jwt = require('jsonwebtoken');

exports.userLogin=async(req,res)=>{
    const { email, password } = req.body;
    const user = await UserLogin.findOne({ email, password });
    if (user) {
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, message: 'Login successful!', token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
}

exports.userSignUp=async(req,res)=>{
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
}

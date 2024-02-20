const User = require('../models/UserModels');
const Multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');



exports.createUser = async (req, res) => {

    //Multer configuration
    const storage = Multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.random() * 1e9}${path.extname(file.originalname)}`;
            cb(null, uniqueName);
        },
    })
    
    
    const upload = Multer({
        storage,
        limits: { fileSize: 1000000 * 100 }
    }).single('profilePic');

    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'File upload failed' });
            }

            const { name, email, password } = req.body;

            const user = new User({
                name,
                email,
                password,
                profilePic: { filename:req.file.filename, path:req.file.path, size:req.file.size,uuid:uuidv4() }, // Save file details in the user schema
            });

            const userData = await user.save();
            res.status(400).json({userData,file:`${process.env.APP_BASE_URL}/download/${userData.profilePic.uuid}`});
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: { error } });
    }
}


exports.getAllUserData = async (req, res) => {
    try {
        const userData = await User.find({});
        res.send(userData);
    } catch (error) {
        res.send(error);
        res.status(404).json({
            success: false,
            error
        })
    }
} 

exports.getSingleUserData = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById({ _id: id });
        console.log(user);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

exports.updateUserData = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        res.send(user);

    } catch (error) {
        res.send(error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({ _id: id });
        res.send(user);
    } catch (error) {
        res.send(error);
    }
}

exports.getProfilePic=async (req, res) => {
    try {
        const file = await User.findOne({ 'profilePic.uuid': req.params.uuid });
        if (!file) {
            return res.status(404).json({success:'False',message:'User Not found'});
        }
        const filePath = path.join(__dirname, '..', file.profilePic.path);
        res.sendFile(filePath);
    } catch (err) {
        return res.status(500).json({success:'false',message:'Internal server error'});
    }
}
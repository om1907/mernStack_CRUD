const User = require('../models/UserModels');


exports.createUser = async (req, res) => {
    const {name,email,password}=req.body;
    try {
        // const bodyData = req.body;
        const user = new User({name,email,password});
        const userData = await user.save();
        res.send(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({success:'false',message:{error}});
    }
}


exports.getAllUserData=async(req,res)=>{
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

exports.getSingleUserData=async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById({ _id: id });
        res.send(user);
    } catch (error) {
        res.send(error);
    }
}

exports.updateUserData=async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        res.send(user);

    } catch (error) {
        res.send(error);
    }
}

exports.deleteUser=async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({ _id: id });
        res.send(user);
    } catch (error) {
        res.send(error);
    }
}
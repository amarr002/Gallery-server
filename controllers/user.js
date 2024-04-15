const User = require('../models/user');
const {setUser}  = require("../services/auth");


async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
    }); 
    // return res.redirect("/gallery");
    const token = setUser(user);
    // console.log(token);
    res.cookie("uid",token,{
        httpOnly: false,
        expires: new Date(Date.now() + 9999999)
    });
    res.status(201).json({ message: 'User created successfully',"user": user, "token" : token });
} 

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user){
        return res.status(401).json({ error: "Invalid email or password" });
        }
    // res.redirect("/gallery");
    const token = setUser(user);
    // console.log(token);
    res.cookie("uid",token,{
        httpOnly: false,
        expires: new Date(Date.now() + 9999999)
    });
    res.status(200).send({ message: 'Login successful', "user": user, "token" : token});
} 

module.exports = {
    handleUserSignup,
    handleUserLogin
}
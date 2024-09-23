const router=require("express").Router();
const User = require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken')
const {authenticateToken}=require("./userAuth")

router.post('/sign-up',async(req,res)=>{
    try {
        console.log(req.body)
        const {username,email,password,address}=req.body;
        if(username.length<4){
            return res.status(400).json({message:"Username should be greater than 3"})
        }

        const existisngUser=await User.findOne({username});
        if(existisngUser){
            return res.status(400).json({message:"Username already exists"});
        }
        const existisngEmail=await User.findOne({email});
        if(existisngEmail){
            return res.status(400).json({message:"Email already exists"});
        }

        if(password.length<=5){
            return res.status(400).json({message:"Password should be greater than 5"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPw=await bcrypt.hash(password,salt);
        const newUser=new User({
            username,
            email,
            password:hashedPw,
            address
        });

        await newUser.save();
        return res.status(200).json({message:"User successfully signed up"});


    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})

router.post('/sign-in',async(req,res)=>{
    try {
        const {username,password}=req.body;
    

        const existisngUser=await User.findOne({username});
        if(!existisngUser){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        await bcrypt.compare(password,existisngUser.password,(err,data)=>{
            if(data){
                const authClaims=[{
                    name:existisngUser.username,
                    role:existisngUser.role
                }]
                const token = jwt.sign({authClaims},"Book-Store",{
                    expiresIn:"30d"
                })
                res.status(200).json({
                    id:existisngUser._id,
                    role:existisngUser.role,
                    token
                });
            }else{
                res.status(400).json({message:"Invalid Credentials"});

            }
        })


    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})

router.get("/get-user-info",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const data=await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})

router.put("/update-address",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const {address}=req.body;
        
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Adress Updated successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})

module.exports=router;
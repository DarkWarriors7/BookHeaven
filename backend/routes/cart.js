const router=require("express").Router();
const User = require("../models/user");
const {authenticateToken}=require("./userAuth")

router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userdata=await User.findById(id);
        const isBookCart=userdata.cart.includes(bookid);

        if(isBookCart){
            return res.status(200).json({message:"Book is already in cart"});

        }
        await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
        return res.json({
            status:"Success",
            message:"Book added to cart"
        })
    }catch(error){
        return res.status(400).json({message:"Internal server error"});
    }
})

router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.params;
        const {id}=req.headers;
        
        await User.findByIdAndUpdate(id,{$pull:{cart:bookid}});

        return res.status(200).json({
            status:"Success",
            message:"Book deleted from cart"
        });
    }catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
})
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try{
        
        const {id}=req.headers;
        const userdata=await User.findById(id).populate("cart");
        const cart=userdata.cart.reverse();
        return res.json({
            status:"success",
            data:cart
        })
    }catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
})
module.exports=router;
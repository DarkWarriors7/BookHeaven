const router=require("express").Router();
const User = require("../models/user");
const {authenticateToken}=require("./userAuth")

router.put("/add-to-favourites",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userdata=await User.findById(id);
        const isBookFavourites=userdata.favourites.includes(bookid);

        if(isBookFavourites){
            return res.status(200).json({message:"Book is already in favourites"});

        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
        return res.status(200).json({message:"Book added to favourites"});
    }catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
})
router.put("/remove-from-favourites",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userdata=await User.findById(id);
        const isBookFavourites=userdata.favourites.includes(bookid);

        if(isBookFavourites){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});

        }
        return res.status(200).json({message:"Book deleted from favourites"});
    }catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
})
router.get("/get-favourite-books",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const userdata=await User.findById(id).populate("favourites");
        const favouriteBooks=userdata.favourites;
        return res.json({
            status:"success",
            data:favouriteBooks
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports=router;

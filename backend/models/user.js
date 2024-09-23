const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,

    },
    avatar: {
        type: String,
        default: "https://www.seekpng.com/png/full/966-9665493_my-profile-icon-blank-profile-image-circle.png",

    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    favourites: [{
        type: mongoose.Types.ObjectId,
        ref: "books"
    }],
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: "books"
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "order"
    }],

},
    {timestamps:true}
);

module.exports=mongoose.model("user",user)
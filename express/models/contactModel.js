const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    watchname:{
        type: String,
        required: [true,"please add the contact name"],

    },
    imgurl:{
        type: String,
        required: [true,"please add the contact name"],

    },
    rating:{
        type: String,
        required: [true,"please add the contact name"],

    },
    text:{
        type: String,
        required: [true,"please add the contact name"],

    },
    username:{
        type: String,
        required: [true,"please add the contact name"],

    },
     userimg:{
        type: String,
        required: [true,"please add the contact name"],

    },
    useremail:{
        type: String,
        required: [true,"please add the contact email address"],
    
    },
    phone:{
        type: String,
        required: [true,"please add the contact phone number"],
    },
});
module.exports=mongoose.model("Contact",contactSchema);

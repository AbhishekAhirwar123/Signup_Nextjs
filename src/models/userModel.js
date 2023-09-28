// First of all Import the mongoose.
import mongoose from "mongoose";

// Create a Schema of Collect the data in object form.
const userSchema = new mongoose.Schema({
    fistname : {
        type : String,
        required : [true, "Please Provide a Username"],
        unique : true,
    },
    lastname : {
        type : String,
        required : [true, "Please Provide a Username"],
    },
    email : {
        type : String,
        required: [true, "Please Provide a Email"],
        unique : true,
    },
    number : {
        type : String,
        required : [true, "Please Provide a Number"],
    },
    gender : {
        type : String,
    },
    password : {
        type : String,
        required : [true, "Please Provide a Password"],
    },
    confirmpassword : {
        type : String,
        required : [true, "Please Provide a Password"],
    },

})

const User = mongoose.models.user || mongoose.model("user", userSchema);
// const User = mongoose.models.user || mongoose.model('users', userSchema);

export default User;
import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
},
{timestamps: true});

export default mongoose.model("User", UserSchema)
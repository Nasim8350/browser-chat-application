// backend/src/models/User.js


import mongoose from "mongoose";



const userSchema = new mongoose.Schema(

    {


        name: {

            type: String,

            required: true,

            trim: true

        },






        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true

        },






        password: {

            type: String,

            required: true,

            minlength: 6

        },






        profileImage: {

            type: String,

            default: ""

        },






        // User about / bio

        about: {

            type: String,

            default: "",

            trim: true,

            maxlength: 150

        },






        status: {

            type: String,

            enum: [

                "online",

                "offline"

            ],

            default: "offline"

        },







        // ===============================
        // LAST SEEN
        // ===============================


        lastSeen: {

            type: Date,

            default: null

        }



    },



    {

        timestamps: true

    }



);








const User = mongoose.model(

    "User",

    userSchema

);








export default User;
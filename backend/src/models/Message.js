// backend/src/models/Message.js


import mongoose from "mongoose";







const messageSchema = new mongoose.Schema(

    {


        conversationId: {


            type: mongoose.Schema.Types.ObjectId,

            ref: "Conversation",

            required: true


        },







        sender: {


            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true


        },







        content: {


            type: String,

            required: true,

            trim: true


        },







        // Message delivered to receiver

        delivered: {


            type: Boolean,

            default: false


        },







        // Receiver has opened/read message

        seen: {


            type: Boolean,

            default: false


        },








        // ===============================
        // DELETE SYSTEM
        // ===============================



        // Message deleted for everyone

        deletedForEveryone: {


            type: Boolean,

            default: false


        },








        // Deleted time

        deletedAt: {


            type: Date,

            default: null


        }





    },





    {

        timestamps: true

    }



);









const Message = mongoose.model(

    "Message",

    messageSchema

);








export default Message;
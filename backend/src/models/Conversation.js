// backend/src/models/Conversation.js


import mongoose from "mongoose";




const conversationSchema = new mongoose.Schema(

    {


        participants: [


            {

                type: mongoose.Schema.Types.ObjectId,

                ref: "User",

                required: true


            }


        ],






        isGroup: {


            type: Boolean,


            default: false


        },







        lastMessage: {


            type: mongoose.Schema.Types.ObjectId,


            ref: "Message"


        },







        // ===============================
        // UNREAD MESSAGE COUNT
        // ===============================


        unreadCount: {


            type: Number,


            default: 0


        }



    },


    {

        timestamps: true

    }


);








const Conversation =

    mongoose.model(

        "Conversation",

        conversationSchema

    );







export default Conversation;
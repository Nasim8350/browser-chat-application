// backend/src/controllers/messageController.js


import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import { getIO } from "../socket.js";









// ===============================
// SEND MESSAGE
// ===============================


export const sendMessage = async (req, res) => {


    try {


        const {


            conversationId,

            receiverId,

            content



        } = req.body;







        let conversation;









        if (conversationId) {



            conversation = await Conversation.findById(

                conversationId

            );



        } else {



            conversation = await Conversation.create({


                participants: [


                    req.user._id,


                    receiverId



                ]


            });



        }









        const message = await Message.create({



            conversationId:

                conversation._id,



            sender:

                req.user._id,



            content,



            delivered: false,



            seen: false



        });









        conversation.lastMessage = message._id;



        await conversation.save();









        // ===============================
        // REAL TIME MESSAGE
        // ===============================


        getIO()

            .to(

                String(receiverId)

            )

            .emit(

                "receive_message",

                {


                    message



                }

            );









        res.status(201).json({



            message:

                "Message sent successfully",



            data:

                message



        });





    }


    catch (error) {



        console.error(

            "Send message error:",

            error

        );



        res.status(500).json({



            message:

                error.message



        });



    }


};











// ===============================
// GET MESSAGES
// ===============================


export const getMessages = async (req, res) => {


    try {



        const messages = await Message.find({



            conversationId:

                req.params.conversationId



        })

            .populate(


                "sender",


                "_id name email"



            )

            .sort({



                createdAt: 1



            });








        res.status(200).json(messages);





    }


    catch (error) {



        res.status(500).json({



            message:

                error.message



        });



    }


};











// ===============================
// MARK MESSAGE AS SEEN
// ===============================


export const markSeen = async (req, res) => {


    try {



        const {


            conversationId



        } = req.body;









        const messages = await Message.find({



            conversationId,



            sender: {



                $ne: req.user._id



            },



            seen: false



        });









        const messageIds = messages.map(

            message => message._id

        );









        await Message.updateMany(



            {

                _id: {



                    $in: messageIds



                }


            },



            {


                $set: {


                    delivered: true,


                    seen: true



                }


            }



        );









        // ===============================
        // SEND SEEN UPDATE
        // ===============================


        messages.forEach((message) => {



            getIO()

                .to(

                    String(

                        message.sender

                    )

                )

                .emit(

                    "message_seen_update",

                    {


                        messageId:

                            message._id



                    }

                );



        });









        res.status(200).json({



            message:

                "Messages marked as seen",



            updated:

                messageIds.length



        });





    }


    catch (error) {



        res.status(500).json({



            message:

                error.message



        });



    }


};
// ===============================
// DELETE MESSAGE FOR EVERYONE
// ===============================


export const deleteMessage = async (req, res) => {


    try {


        const { messageId } = req.params;







        const message = await Message.findById(

            messageId

        );







        if (!message) {


            return res.status(404).json({


                message:

                    "Message not found"


            });


        }








        // ===============================
        // CHECK OWNER
        // ===============================


        if (

            String(message.sender)

            !==

            String(req.user._id)

        ) {



            return res.status(403).json({


                message:

                    "You can delete only your own message"



            });


        }









        // ===============================
        // UPDATE MESSAGE
        // ===============================


        message.deletedForEveryone = true;


        message.deletedAt = new Date();


        message.content = "This message was deleted";



        await message.save();









        // ===============================
        // REAL TIME UPDATE
        // ===============================


        const conversation = await Conversation.findById(

            message.conversationId

        );








        if (conversation) {



            conversation.participants.forEach((userId) => {



                getIO()

                    .to(

                        String(userId)

                    )

                    .emit(

                        "message_deleted",

                        {


                            messageId:

                                message._id,



                            message



                        }

                    );



            });



        }









        res.status(200).json({



            message:

                "Message deleted successfully",



            data:

                message



        });





    }


    catch (error) {



        console.error(

            "Delete message error:",

            error

        );





        res.status(500).json({



            message:

                error.message



        });



    }



};
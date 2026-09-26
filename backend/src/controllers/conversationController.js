// backend/src/controllers/conversationController.js


import Conversation from "../models/Conversation.js";







// =====================================
// GET OR CREATE CONVERSATION
// =====================================


export const getConversation = async (req, res) => {


    try {


        const {

            userId

        } = req.params;







        let conversation =

            await Conversation.findOne({



                participants: {


                    $all: [

                        req.user._id,

                        userId

                    ],



                    $size: 2


                }



            });









        if (!conversation) {



            conversation =

                await Conversation.create({


                    participants: [


                        req.user._id,


                        userId


                    ]



                });



        }








        res.status(200).json(

            conversation

        );



    }


    catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


};












// =====================================
// GET MY CONVERSATIONS
// REMOVE DUPLICATE USERS
// SORT LATEST FIRST
// =====================================



export const getMyConversations = async (req, res) => {


    try {


        const conversations =


            await Conversation.find({


                participants: req.user._id


            })


                .populate(

                    "participants",

                    "name email profileImage status"

                )


                .populate(

                    "lastMessage"

                )


                .sort({

                    updatedAt: -1

                });









        // Remove duplicate users

        const unique = [];



        const seenUsers = new Set();







        conversations.forEach((conversation) => {



            const otherUser =

                conversation.participants.find(

                    user =>

                        String(user._id) !==

                        String(req.user._id)

                );







            if (!otherUser)

                return;







            const userId =

                String(otherUser._id);








            if (!seenUsers.has(userId)) {



                seenUsers.add(userId);



                unique.push(conversation);



            }



        });









        res.status(200).json(

            unique

        );




    }



    catch (error) {



        res.status(500).json({


            message: error.message


        });



    }



};
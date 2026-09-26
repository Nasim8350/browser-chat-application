import express from "express";


import authMiddleware from "../middleware/authMiddleware.js";


import {

    getConversation,

    getMyConversations

}

    from "../controllers/conversationController.js";



const router = express.Router();





// Get all my conversations
// latest first

router.get(

    "/",

    authMiddleware,

    getMyConversations

);







// Get or create conversation with user

router.get(

    "/:userId",

    authMiddleware,

    getConversation

);





export default router;
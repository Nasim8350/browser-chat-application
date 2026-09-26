// backend/src/routes/messageRoutes.js


import express from "express";


import {

    sendMessage,

    getMessages,

    markSeen,

    deleteMessage


} from "../controllers/messageController.js";


import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();








// ===============================
// SEND MESSAGE
// ===============================


router.post(

    "/send",

    authMiddleware,

    sendMessage

);









// ===============================
// GET MESSAGES
// ===============================


router.get(

    "/:conversationId",

    authMiddleware,

    getMessages

);









// ===============================
// MARK MESSAGE SEEN
// ===============================


router.put(

    "/seen",

    authMiddleware,

    markSeen

);









// ===============================
// DELETE MESSAGE FOR EVERYONE
// ===============================


router.delete(

    "/:messageId",

    authMiddleware,

    deleteMessage

);








export default router;
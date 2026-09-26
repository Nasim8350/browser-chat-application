// frontend/src/services/messageService.js


import API from "./api";









// ===============================
// SEND MESSAGE
// ===============================


export const sendMessage = (data) => {


    return API.post(

        "/messages/send",

        data

    );


};











// ===============================
// GET MESSAGES
// ===============================


export const getMessages = (conversationId) => {


    return API.get(

        `/messages/${conversationId}`

    );


};











// ===============================
// MARK MESSAGES AS SEEN
// ===============================


export const markMessagesSeen = (conversationId) => {


    return API.put(

        "/messages/seen",

        {


            conversationId



        }

    );


};











// ===============================
// DELETE MESSAGE FOR EVERYONE
// ===============================


export const deleteMessage = (messageId) => {


    return API.delete(

        `/messages/${messageId}`

    );


};
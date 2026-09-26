import api from "./api";



// GET MY CONVERSATIONS
// Sorted by latest message

export const getMyConversations = async () => {


    const response = await api.get(

        "/conversations"

    );


    return response;


};





// GET OR CREATE CONVERSATION

export const getConversation = async (userId) => {


    const response = await api.get(

        `/conversations/${userId}`

    );


    return response;


};
// frontend/src/context/ChatContext.jsx


import {
    createContext,
    useState,
    useEffect
} from "react";


import socket from "../socket";







export const ChatContext = createContext();









export const ChatProvider = ({ children }) => {



    const [selectedUser, setSelectedUser] = useState(null);


    const [conversationId, setConversationId] = useState(null);


    const [onlineUsers, setOnlineUsers] = useState([]);


    // refresh chat list

    const [refreshChats, setRefreshChats] = useState(0);



    // realtime new message

    const [newMessageNotification, setNewMessageNotification] = useState(null);











    useEffect(() => {



        // ===============================
        // ONLINE USERS LIST
        // ===============================



        const handleOnlineUsers = (users) => {



            console.log(

                "CURRENT ONLINE USERS:",

                users

            );



            setOnlineUsers(

                users

            );



        };











        // ===============================
        // USER ONLINE
        // ===============================



        const handleUserOnline = (userId) => {



            console.log(

                "USER ONLINE:",

                userId

            );






            setOnlineUsers(

                previous => {



                    if (

                        previous.includes(userId)

                    ) {


                        return previous;


                    }






                    return [


                        ...previous,


                        userId


                    ];



                }


            );



        };













        // ===============================
        // USER OFFLINE
        // ===============================



        const handleUserOffline = (userId) => {



            console.log(

                "USER OFFLINE:",

                userId

            );








            setOnlineUsers(

                previous =>


                    previous.filter(

                        id =>

                            id !== userId


                    )


            );



        };














        // ===============================
        // NEW MESSAGE NOTIFICATION
        // ===============================



        const handleNewMessage = (data) => {



            console.log(

                "NEW MESSAGE NOTIFICATION:",

                data

            );








            setNewMessageNotification(

                data

            );








            // refresh ChatList

            setRefreshChats(

                previous => previous + 1

            );



        };












        socket.on(

            "online_users",

            handleOnlineUsers

        );








        socket.on(

            "user_online",

            handleUserOnline

        );








        socket.on(

            "user_offline",

            handleUserOffline

        );








        socket.on(

            "new_message_notification",

            handleNewMessage

        );












        return () => {



            socket.off(

                "online_users",

                handleOnlineUsers

            );





            socket.off(

                "user_online",

                handleUserOnline

            );





            socket.off(

                "user_offline",

                handleUserOffline

            );





            socket.off(

                "new_message_notification",

                handleNewMessage

            );



        };




    }, []);













    return (



        <ChatContext.Provider



            value={{



                selectedUser,

                setSelectedUser,





                conversationId,

                setConversationId,





                onlineUsers,

                setOnlineUsers,





                refreshChats,

                setRefreshChats,





                newMessageNotification,

                setNewMessageNotification



            }}



        >


            {children}


        </ChatContext.Provider>


    );



};
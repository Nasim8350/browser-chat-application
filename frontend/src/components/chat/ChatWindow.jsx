// frontend/src/components/chat/ChatWindow.jsx


import {
    useContext,
    useEffect,
    useState,
    useRef
} from "react";


import {

    ChatContext

} from "../../context/ChatContext";


import {

    AuthContext

} from "../../context/AuthContext";


import {

    getMessages,

    sendMessage,

    markMessagesSeen,

    deleteMessage

} from "../../services/messageService";


import socket from "../../socket";









const ChatWindow = () => {



    const {


        selectedUser,

        conversationId,

        onlineUsers,

        setRefreshChats



    } = useContext(ChatContext);









    const {


        user



    } = useContext(AuthContext);









    const [messages, setMessages] = useState([]);


    const [text, setText] = useState("");


    const [typingUser, setTypingUser] = useState("");


    const [loading, setLoading] = useState(false);









    const typingTimer = useRef(null);


    const messagesEndRef = useRef(null);











    // ===============================
    // LOAD MESSAGES
    // ===============================


    useEffect(() => {


        if (conversationId) {


            loadMessages();


        }


    }, [conversationId]);









    const loadMessages = async () => {


        try {


            setLoading(true);







            const response =

                await getMessages(

                    conversationId

                );








            setMessages(

                response.data

            );








            await markMessagesSeen(

                conversationId

            );








            setRefreshChats(

                previous => previous + 1

            );





        }



        catch (error) {



            console.error(

                "Load messages error:",

                error

            );



        }



        finally {


            setLoading(false);


        }



    };











    // ===============================
    // AUTO SCROLL
    // ===============================


    useEffect(() => {


        messagesEndRef.current?.scrollIntoView({


            behavior: "smooth"



        });



    }, [messages]);











    // ===============================
    // SOCKET EVENTS
    // ===============================


    useEffect(() => {



        const handleReceiveMessage = (data) => {



            const incomingMessage =

                data.message;









            if (

                incomingMessage.conversationId !==

                conversationId

            ) {


                return;


            }








            socket.emit(

                "message_received",

                {


                    senderId:

                        incomingMessage.sender?._id ||

                        incomingMessage.sender,



                    messageId:

                        incomingMessage._id



                }

            );








            setMessages(

                previous => {


                    const exists =

                        previous.some(

                            msg =>

                                msg._id ===

                                incomingMessage._id

                        );







                    if (exists) {


                        return previous;


                    }







                    return [


                        ...previous,


                        incomingMessage



                    ];



                }

            );









            setRefreshChats(

                previous => previous + 1

            );



        };









        socket.on(

            "receive_message",

            handleReceiveMessage

        );









        socket.on(

            "user_typing",

            (data) => {


                setTypingUser(

                    data.senderName

                );


            }

        );









        socket.on(

            "user_stop_typing",

            () => {


                setTypingUser("");



            }

        );









        socket.on(

            "message_delivered",

            ({ messageId }) => {



                setMessages(

                    previous =>


                        previous.map(

                            msg =>



                                msg._id === messageId



                                    ?



                                    {


                                        ...msg,


                                        delivered: true



                                    }



                                    :



                                    msg



                        )



                );



            }

        );









        socket.on(

            "message_seen_update",

            ({ messageId }) => {



                setMessages(

                    previous =>


                        previous.map(

                            msg =>



                                msg._id === messageId



                                    ?



                                    {


                                        ...msg,


                                        delivered: true,


                                        seen: true



                                    }



                                    :



                                    msg



                        )



                );



            }

        );









        // ===============================
        // MESSAGE DELETE UPDATE
        // ===============================


        socket.on(

            "message_deleted",

            ({ messageId }) => {



                setMessages(

                    previous =>


                        previous.map(

                            msg =>



                                msg._id === messageId



                                    ?



                                    {


                                        ...msg,


                                        deletedForEveryone: true,


                                        content:

                                            "This message was deleted"



                                    }



                                    :



                                    msg



                        )



                );



            }

        );

        return () => {


            socket.off(

                "receive_message",

                handleReceiveMessage

            );




            socket.off(

                "user_typing"

            );




            socket.off(

                "user_stop_typing"

            );




            socket.off(

                "message_delivered"

            );




            socket.off(

                "message_seen_update"

            );




            socket.off(

                "message_deleted"

            );



        };



    }, [

        conversationId,

        setRefreshChats

    ]);











    // ===============================
    // ONLINE STATUS
    // ===============================


    const isOnline = () => {


        if (!selectedUser)

            return false;








        return onlineUsers.some(


            id =>



                String(id)

                ===

                String(selectedUser._id)



        );



    };











    // ===============================
    // LAST SEEN FORMAT
    // ===============================


    const getLastSeen = () => {


        if (!selectedUser?.lastSeen)

            return "Offline";








        return new Date(

            selectedUser.lastSeen

        )

            .toLocaleTimeString(

                [],

                {


                    hour: "2-digit",


                    minute: "2-digit"



                }


            );



    };











    // ===============================
    // TYPING HANDLER
    // ===============================


    const handleTyping = (value) => {


        setText(value);







        if (!selectedUser)

            return;









        socket.emit(

            "typing",

            {


                receiverId:

                    selectedUser._id,



                senderName:

                    user.name



            }

        );








        clearTimeout(

            typingTimer.current

        );









        typingTimer.current = setTimeout(() => {



            socket.emit(

                "stop_typing",

                {


                    receiverId:

                        selectedUser._id



                }

            );



        }, 1000);



    };











    // ===============================
    // SEND MESSAGE
    // ===============================


    const handleSend = async () => {


        if (!text.trim())

            return;







        if (!selectedUser)

            return;








        try {



            const response =

                await sendMessage({



                    conversationId,


                    receiverId:

                        selectedUser._id,



                    content: text



                });








            const newMessage =

                response.data.data;









            setMessages(

                previous => {



                    const exists =

                        previous.some(

                            msg =>

                                msg._id ===

                                newMessage._id

                        );







                    if (exists) {


                        return previous;


                    }







                    return [


                        ...previous,


                        newMessage



                    ];



                }

            );









            socket.emit(

                "send_message",

                {


                    receiverId:

                        selectedUser._id,



                    message:

                        newMessage



                }

            );









            setRefreshChats(

                previous => previous + 1

            );









            setText("");



        }



        catch (error) {



            console.error(

                "Send message error:",

                error

            );



        }



    };











    // ===============================
    // DELETE MESSAGE
    // ===============================


    const handleDeleteMessage = async (messageId) => {


        try {



            await deleteMessage(

                messageId

            );



        }



        catch (error) {



            console.error(

                "Delete message error:",

                error

            );



        }



    };











    // ===============================
    // CHECK MESSAGE OWNER
    // ===============================


    const checkMine = (message) => {


        const senderId = String(

            message.sender?._id ||

            message.sender

        );








        const currentUserId = String(

            user?._id ||

            user?.id

        );








        return senderId === currentUserId;



    };











    // ===============================
    // MESSAGE STATUS
    // ===============================


    const getMessageStatus = (msg) => {


        if (msg.seen)

            return "🔵✓✓";







        if (msg.delivered)

            return "✓✓";







        return "✓";



    };

    // ===============================
    // JSX
    // ===============================


    return (

        <div style={styles.container}>


            {

                selectedUser ?


                    <>


                        {/* ===============================
HEADER
=============================== */}


                        <div style={styles.header}>


                            <div style={styles.avatar}>

                                👤

                            </div>





                            <div>


                                <h3>

                                    {selectedUser.name}

                                </h3>







                                <p

                                    style={{

                                        ...styles.status,


                                        color:

                                            isOnline()

                                                ?

                                                "green"

                                                :

                                                "#777"



                                    }}

                                >


                                    {


                                        isOnline()


                                            ?


                                            "🟢 Online"


                                            :


                                            `⚪ Last seen ${getLastSeen()}`



                                    }



                                </p>



                            </div>



                        </div>









                        {/* ===============================
MESSAGES
=============================== */}


                        <div style={styles.messages}>


                            {

                                loading &&


                                <div style={styles.loading}>

                                    Loading messages...

                                </div>


                            }








                            {

                                typingUser &&


                                <div style={styles.typing}>

                                    {typingUser} is typing...

                                </div>


                            }








                            {

                                messages.length === 0 && !loading ?



                                    <div style={styles.emptyMessage}>

                                        No messages yet.
                                        Start conversation.

                                    </div>



                                    :


                                    messages.map((msg, index) => {


                                        const mine = checkMine(msg);



                                        return (



                                            <div


                                                key={msg._id || index}



                                                style={{


                                                    ...styles.row,


                                                    justifyContent:


                                                        mine


                                                            ?


                                                            "flex-end"


                                                            :


                                                            "flex-start"



                                                }}



                                            >


                                                <div


                                                    style={{


                                                        ...styles.message,


                                                        background:


                                                            mine


                                                                ?


                                                                "#dcf8c6"


                                                                :


                                                                "#ffffff"



                                                    }}



                                                >


                                                    <div>


                                                        {


                                                            msg.deletedForEveryone


                                                                ?


                                                                "🚫 This message was deleted"


                                                                :


                                                                msg.content



                                                        }



                                                    </div>








                                                    <div style={styles.actions}>


                                                        {


                                                            mine && !msg.deletedForEveryone &&



                                                            <button


                                                                onClick={() =>


                                                                    handleDeleteMessage(

                                                                        msg._id

                                                                    )


                                                                }


                                                                style={styles.deleteBtn}


                                                            >

                                                                Delete

                                                            </button>


                                                        }



                                                    </div>









                                                    <div style={styles.footer}>


                                                        <span>


                                                            {

                                                                new Date(

                                                                    msg.createdAt

                                                                )

                                                                    .toLocaleTimeString(

                                                                        [],

                                                                        {

                                                                            hour: "2-digit",

                                                                            minute: "2-digit"

                                                                        }

                                                                    )


                                                            }


                                                        </span>







                                                        {


                                                            mine &&


                                                            <span>


                                                                {

                                                                    getMessageStatus(msg)

                                                                }


                                                            </span>


                                                        }



                                                    </div>







                                                </div>



                                            </div>



                                        );



                                    })


                            }





                            <div ref={messagesEndRef} />


                        </div>









                        {/* ===============================
INPUT
=============================== */}


                        <div style={styles.inputBox}>


                            <input



                                value={text}



                                onChange={(e) =>


                                    handleTyping(

                                        e.target.value

                                    )


                                }



                                onKeyDown={(e) => {


                                    if (e.key === "Enter") {


                                        handleSend();


                                    }


                                }}



                                placeholder="Type message..."



                                style={styles.input}



                            />







                            <button


                                onClick={handleSend}


                                style={styles.send}



                            >

                                Send

                            </button>







                        </div>





                    </>



                    :


                    <div style={styles.empty}>


                        <h2>

                            Chat Application

                        </h2>


                        <p>

                            Select a user to start chatting

                        </p>


                    </div>



            }



        </div>



    );

};












// ===============================
// STYLES
// ===============================


const styles = {



    container: {


        flex: 1,


        height: "100%",


        display: "flex",


        flexDirection: "column",


        background: "#f8fafc"



    },







    header: {


        height: "80px",


        display: "flex",


        alignItems: "center",


        gap: "15px",


        padding: "0 25px",


        background: "#ffffff",


        borderBottom: "1px solid #ddd"



    },







    avatar: {


        fontSize: "40px"



    },







    status: {


        margin: 0,


        fontSize: "13px"



    },







    messages: {


        flex: 1,


        overflowY: "auto",


        padding: "20px",


        display: "flex",


        flexDirection: "column",


        gap: "8px"



    },







    row: {


        display: "flex",


        width: "100%"



    },







    message: {


        maxWidth: "60%",


        padding: "10px 14px",


        borderRadius: "12px",


        boxShadow:

            "0 1px 2px rgba(0,0,0,0.15)",


        display: "flex",


        flexDirection: "column",


        gap: "5px"



    },







    actions: {


        display: "flex",


        justifyContent: "flex-end"



    },







    deleteBtn: {


        fontSize: "11px",


        cursor: "pointer",


        border: "none",


        background: "transparent",


        color: "red"



    },







    footer: {


        display: "flex",


        justifyContent: "flex-end",


        gap: "5px",


        fontSize: "11px",


        color: "#666"



    },







    inputBox: {


        display: "flex",


        gap: "10px",


        padding: "15px",


        background: "#ffffff",


        borderTop: "1px solid #ddd"



    },







    input: {


        flex: 1,


        padding: "14px",


        borderRadius: "25px",


        border: "1px solid #ccc"



    },







    send: {


        padding: "12px 25px",


        border: "none",


        borderRadius: "25px",


        background: "#2563eb",


        color: "#ffffff",


        cursor: "pointer"



    },







    typing: {


        color: "#777",


        fontSize: "13px"



    },







    loading: {


        textAlign: "center",


        color: "#777"



    },







    emptyMessage: {


        textAlign: "center",


        color: "#777",


        marginTop: "20px"



    },







    empty: {


        height: "100%",


        display: "flex",


        justifyContent: "center",


        AlignItems: "center",


        flexDirection: "column"



    }



};








export default ChatWindow;
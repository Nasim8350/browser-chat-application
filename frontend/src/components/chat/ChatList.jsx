// frontend/src/components/chat/ChatList.jsx


import {
    useEffect,
    useState,
    useContext
} from "react";


import {

    getUsers

} from "../../services/userService";


import {

    getMyConversations,

    getConversation

} from "../../services/conversationService";


import {

    ChatContext

} from "../../context/ChatContext";









const ChatList = () => {



    const [users, setUsers] = useState([]);


    const [loading, setLoading] = useState(true);


    const [error, setError] = useState("");







    const {


        selectedUser,

        setSelectedUser,

        setConversationId,

        onlineUsers,

        refreshChats



    } = useContext(ChatContext);











    useEffect(() => {


        loadChatList();


    }, [refreshChats]);









    const loadChatList = async () => {


        try {



            const userResponse =

                await getUsers();







            const conversationResponse =

                await getMyConversations();









            const allUsers =

                userResponse.data.users;







            const conversations =

                conversationResponse.data;









            const mergedUsers = allUsers.map((user) => {





                const conversation =

                    conversations.find(

                        conv =>

                            conv.participants.some(

                                participant =>


                                    String(participant._id)

                                    ===

                                    String(user._id)


                            )

                    );









                return {


                    ...user,


                    conversationId:

                        conversation?._id || null,




                    lastMessage:

                        conversation?.lastMessage || null,




                    updatedAt:

                        conversation?.updatedAt || null,




                    unreadCount:

                        conversation?.unreadCount || 0



                };



            });









            // latest message first


            mergedUsers.sort(

                (a, b) => {



                    if (!a.updatedAt)

                        return 1;




                    if (!b.updatedAt)

                        return -1;





                    return (

                        new Date(b.updatedAt)

                        -

                        new Date(a.updatedAt)

                    );


                }


            );








            setUsers(

                mergedUsers

            );






        }



        catch (error) {



            console.error(

                "Load chat list error:",

                error

            );



            setError(

                "Unable to load chats"

            );



        }



        finally {


            setLoading(false);


        }



    };









    const handleUserClick = async (user) => {


        try {



            setSelectedUser(

                user

            );








            if (user.conversationId) {



                setConversationId(

                    user.conversationId

                );



            }

            else {



                const response =

                    await getConversation(

                        user._id

                    );





                setConversationId(

                    response.data._id

                );



            }



        }



        catch (error) {



            console.error(

                "Open conversation error:",

                error

            );



        }



    };









    const checkOnline = (userId) => {


        return onlineUsers.some(

            id =>

                String(id)

                ===

                String(userId)

        );


    };









    const formatTime = (date) => {


        if (!date)

            return "";





        return new Date(date)

            .toLocaleTimeString(

                [],

                {

                    hour: "2-digit",

                    minute: "2-digit"

                }

            );



    };









    return (


        <div style={styles.container}>


            <h2 style={styles.title}>

                Chats

            </h2>








            {

                loading &&

                <p>

                    Loading...

                </p>

            }








            {

                error &&

                <p style={styles.error}>

                    {error}

                </p>

            }









            <div style={styles.list}>


                {


                    users.map((user) => (




                        <div


                            key={user._id}



                            onClick={() =>


                                handleUserClick(user)

                            }



                            style={{


                                ...styles.item,



                                background:


                                    selectedUser?._id

                                        ===

                                        user._id


                                        ?


                                        "#dbeafe"


                                        :


                                        "#ffffff"



                            }}



                        >







                            <div style={styles.avatar}>

                                👤

                            </div>









                            <div style={styles.content}>


                                <div style={styles.top}>


                                    <h4>

                                        {user.name}

                                    </h4>







                                    <span style={styles.time}>

                                        {

                                            formatTime(

                                                user.updatedAt

                                            )

                                        }

                                    </span>



                                </div>









                                <div style={styles.bottom}>


                                    <p>


                                        {


                                            user.lastMessage

                                                ?

                                                user.lastMessage.content

                                                :

                                                "No messages yet"



                                        }



                                    </p>









                                    <div>


                                        {


                                            user.unreadCount > 0 &&



                                            <span style={styles.badge}>


                                                {

                                                    user.unreadCount

                                                }


                                            </span>


                                        }








                                        <span>


                                            {


                                                checkOnline(

                                                    user._id

                                                )


                                                    ?


                                                    "🟢"


                                                    :


                                                    "⚪"



                                            }



                                        </span>



                                    </div>






                                </div>





                            </div>









                        </div>





                    ))



                }





            </div>





        </div>


    );


};









const styles = {



    container: {


        width: "350px",

        height: "100%",


        padding: "20px",

        background: "#ffffff",

        borderRight: "1px solid #ddd",

        boxSizing: "border-box",

        display: "flex",

        flexDirection: "column"


    },






    title: {


        margin: "0 0 20px 0"


    },






    list: {


        flex: 1,

        overflowY: "auto"


    },






    item: {


        display: "flex",

        gap: "12px",

        padding: "14px",

        borderRadius: "12px",

        marginBottom: "8px",

        cursor: "pointer"


    },






    avatar: {


        fontSize: "34px"


    },






    content: {


        flex: 1


    },






    top: {


        display: "flex",

        justifyContent: "space-between",

        alignItems: "center"


    },






    time: {


        fontSize: "12px",

        color: "#777"


    },






    bottom: {


        display: "flex",

        justifyContent: "space-between",

        alignItems: "center"


    },






    badge: {


        background: "red",

        color: "white",

        borderRadius: "50%",


        padding: "3px 8px",

        fontSize: "12px",

        marginRight: "8px"


    },






    error: {


        color: "red"


    }



};







export default ChatList;
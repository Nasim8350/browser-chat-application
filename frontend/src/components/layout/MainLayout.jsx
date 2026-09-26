// frontend/src/components/layout/MainLayout.jsx


import { useState } from "react";


import Sidebar from "./Sidebar";


import ChatList from "../chat/ChatList";


import ChatWindow from "../chat/ChatWindow";


import SettingsPanel from "../settings/SettingsPanel";


import ProfilePage from "../../pages/ProfilePage";








const MainLayout = () => {



    const [activeMenu, setActiveMenu] = useState("chat");


    const [darkMode, setDarkMode] = useState(false);









    const renderContent = () => {



        // ===============================
        // PROFILE
        // ===============================


        if (activeMenu === "profile") {



            return (

                <ProfilePage />

            );



        }









        // ===============================
        // SETTINGS
        // ===============================


        if (activeMenu === "settings") {



            return (

                <SettingsPanel


                    darkMode={darkMode}


                    setDarkMode={setDarkMode}


                />

            );


        }









        // ===============================
        // CHAT
        // ===============================


        return (


            <div style={styles.chatArea}>


                <ChatList />


                <ChatWindow />


            </div>


        );



    };









    return (



        <div

            style={{

                ...styles.layout,


                background:


                    darkMode


                        ?


                        "#020617"


                        :


                        "#f8fafc"



            }}

        >





            <Sidebar


                activeMenu={activeMenu}


                setActiveMenu={setActiveMenu}


            />







            <main style={styles.main}>


                {renderContent()}


            </main>





        </div>



    );



};









const styles = {



    layout: {


        display: "flex",


        height: "100vh",


        width: "100vw",


        overflow: "hidden"



    },








    main: {


        flex: 1,


        height: "100vh",


        overflow: "hidden"



    },








    chatArea: {


        display: "flex",


        height: "100vh",


        width: "100%"



    }



};








export default MainLayout;
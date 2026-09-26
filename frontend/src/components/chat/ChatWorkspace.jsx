import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";


const ChatWorkspace = () => {


    return (

        <div style={styles.container}>


            <ChatList />


            <ChatWindow />


        </div>

    );

};



const styles = {


    container: {

        display: "flex",

        height: "calc(100vh - 60px)",

        background: "#ffffff",

        borderRadius: "20px",

        overflow: "hidden",

        boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)"

    }


};



export default ChatWorkspace;
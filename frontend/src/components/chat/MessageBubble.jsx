const MessageBubble = ({ text, own }) => {


    return (

        <div

            style={{

                ...styles.message,

                alignSelf: own
                    ?
                    "flex-end"
                    :
                    "flex-start",

                background: own
                    ?
                    "#2563eb"
                    :
                    "#ffffff",

                color: own
                    ?
                    "white"
                    :
                    "#111"

            }}

        >


            {text}


        </div>

    );


};



const styles = {


    message: {

        padding: "12px 18px",

        borderRadius: "18px",

        marginBottom: "12px",

        maxWidth: "300px"

    }


};



export default MessageBubble;
const MessageInput = () => {


    return (

        <div style={styles.container}>


            <input

                placeholder="Type message..."

                style={styles.input}

            />


            <button style={styles.button}>

                Send

            </button>


        </div>

    );


};



const styles = {


    container: {

        display: "flex",

        padding: "15px",

        borderTop: "1px solid #eee"

    },



    input: {

        flex: 1,

        padding: "12px",

        borderRadius: "10px",

        border: "1px solid #ddd"

    },



    button: {

        marginLeft: "10px",

        padding: "12px 25px",

        background: "#2563eb",

        color: "white",

        border: "none",

        borderRadius: "10px"

    }


};



export default MessageInput;
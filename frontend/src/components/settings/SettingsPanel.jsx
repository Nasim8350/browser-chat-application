// frontend/src/components/settings/SettingsPanel.jsx


const SettingsPanel = ({

    darkMode,

    setDarkMode

}) => {



    return (


        <div

            style={{

                ...styles.container,


                background:


                    darkMode


                        ?


                        "#111827"


                        :


                        "#ffffff",





                color:


                    darkMode


                        ?


                        "white"


                        :


                        "#111827"



            }}

        >



            <h1>

                Settings

            </h1>








            {/* ===============================
                APPEARANCE
            =============================== */}



            <div style={styles.section}>


                <h3>

                    Appearance

                </h3>






                <div


                    style={{

                        ...styles.item,


                        background:


                            darkMode


                                ?


                                "#1f2937"


                                :


                                "#f8fafc"

                    }}



                >



                    <span>

                        🌙

                    </span>






                    <p>

                        Dark Mode

                    </p>






                    <button


                        onClick={() =>

                            setDarkMode(

                                !darkMode

                            )

                        }



                        style={styles.toggle}



                    >



                        {

                            darkMode

                                ?

                                "ON"

                                :

                                "OFF"



                        }



                    </button>




                </div>



            </div>






        </div>


    );


};









const styles = {



    container: {


        height: "100%",


        padding: "30px",


        borderRadius: "20px"



    },







    section: {


        marginTop: "30px"



    },







    item: {


        display: "flex",


        alignItems: "center",


        gap: "15px",


        padding: "15px",


        borderRadius: "12px",


        marginTop: "10px"



    },







    toggle: {


        marginLeft: "auto",


        padding: "8px 18px",


        border: "none",


        borderRadius: "20px",


        background: "#2563eb",


        color: "white",


        cursor: "pointer"



    }



};






export default SettingsPanel;
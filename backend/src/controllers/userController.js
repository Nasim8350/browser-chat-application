// backend/src/controllers/userController.js


import User from "../models/User.js";









// ===============================
// GET ALL USERS
// ===============================


export const getUsers = async (req, res) => {


    try {


        const users = await User.find()

            .select("-password")

            .sort({

                updatedAt: -1

            });








        res.status(200).json({


            success: true,


            users


        });




    }


    catch (error) {



        console.error(

            "Get Users Error:",

            error

        );





        res.status(500).json({



            success: false,



            message:

                error.message



        });



    }


};











// ===============================
// GET MY PROFILE
// ===============================


export const getProfile = async (req, res) => {


    try {



        const userId =

            req.user._id ||

            req.user.id;








        console.log(

            "PROFILE USER ID:",

            userId

        );








        const user = await User.findById(

            userId

        )

            .select(

                "-password"

            );








        if (!user) {



            return res.status(404).json({



                success: false,



                message:

                    "User not found"



            });



        }








        res.status(200).json({



            success: true,



            user



        });





    }



    catch (error) {



        console.error(

            "Get Profile Error:",

            error

        );





        res.status(500).json({



            success: false,



            message:

                error.message



        });



    }



};











// ===============================
// UPDATE MY PROFILE
// ===============================


export const updateProfile = async (req, res) => {


    try {



        const userId =

            req.user._id ||

            req.user.id;








        const {


            name,

            about,

            profileImage



        } = req.body;








        const user = await User.findById(

            userId

        );








        if (!user) {



            return res.status(404).json({



                success: false,



                message:

                    "User not found"



            });



        }








        if (name !== undefined) {



            user.name = name;



        }








        if (about !== undefined) {



            user.about = about;



        }








        if (profileImage !== undefined) {



            user.profileImage = profileImage;



        }








        await user.save();








        const updatedUser = await User.findById(

            user._id

        )

            .select(

                "-password"

            );








        res.status(200).json({



            success: true,



            message:

                "Profile updated successfully",



            user:

                updatedUser



        });





    }



    catch (error) {



        console.error(

            "Update Profile Error:",

            error

        );





        res.status(500).json({



            success: false,



            message:

                error.message



        });



    }



};
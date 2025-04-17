const UserPet = require("../Models/UserAsPet");

exports.getData = async (req, res) => {

    try {
        const userId = req.body.uId;

        // Find the user by ID
        const user = await UserPet.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Send the user data in the response
        res.status(200).json({
            success: true,
            data: user,
            message: "the token is valid and verified",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}
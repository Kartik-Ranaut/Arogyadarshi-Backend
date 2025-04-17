const UserPet = require("../Models/UserAsPet");


exports.addFamilyMember = async (req, res) => {
    try{
        let {name, gender, age, relation, uId} = req.body;

        const user = await UserPet.findById(uId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
       // Create a new family member object
        user.family.push({
            name:name,
            gender:gender,
            relation:relation,
            age:age,
        });
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Family member added successfully",
            family: user.family,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
}
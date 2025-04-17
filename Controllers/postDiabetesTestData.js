const UserPet = require("../Models/UserAsPet");

exports.postDiabetesTestData = async (req, res) => {
    try{
        let {familyId,Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age,uId,percentage}=req.body;
        let user =await UserPet.findById(uId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Create a new diabetes prediction object

        let member = user.family.find(f => f._id.toString() === familyId);;
        if (!member) {
            return res.status(404).json({ message: "Family member not found" });
        }

        // Push the prediction into the correct family member
        if (!member.diabetesPredictions) {
            member.diabetesPredictions = []; // initialize if not present
        }
        member.diabetesPredictions.push({
            Pregnancies: Pregnancies,
            Glucose: Glucose,
            BloodPressure: BloodPressure,
            SkinThickness: SkinThickness,
            Insulin: Insulin,
            BMI: BMI,
            DiabetesPedigreeFunction: DiabetesPedigreeFunction,
            percentage:percentage
        })
        await user.save();
        return res.status(201).json({
            success: true,
            message: "Family member added successfully",
            family: user.family,
        });

    }catch(error){
        console.error('Error in postDiabetesTestData:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const UserPet = require("../Models/UserAsPet");

exports.postHeartDiseaseTestData = async (req, res) => {
    try {
        let {
            familyId,
            age,
            sex,
            cp,               // chest pain type
            trestbps,         // resting blood pressure
            chol,             // cholesterol
            fbs,              // fasting blood sugar
            restecg,          // resting electrocardiographic results
            thalach,          // max heart rate achieved
            exang,            // exercise-induced angina
            oldpeak,          // ST depression
            slope,
            ca,
            thal,
            uId,
            percentage
        } = req.body;

        let user = await UserPet.findById(uId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let member = user.family.find(f => f._id.toString() === familyId);
        if (!member) {
            return res.status(404).json({ message: "Family member not found" });
        }

        if (!member.heartPredictions) {
            member.heartPredictions = [];
        }

        member.heartPredictions.push({
            age,
            sex,
            cp,
            trestbps,
            chol,
            fbs,
            restecg,
            thalach,
            exang,
            oldpeak,
            slope,
            ca,
            thal,
            percentage
        });

        await user.save();

        return res.status(201).json({
            success: true,
            message: "Heart prediction added successfully to family member.",
            family: user.family
        });

    } catch (error) {
        console.error('Error in postHeartTestData:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
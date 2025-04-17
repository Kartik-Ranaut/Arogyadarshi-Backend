const bcrypt = require('bcryptjs');
const UserPet = require("../Models/UserAsPet");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();



exports.signup= async (req, res) => {
    try{
        let { name, email, password, address, disease, age,phone,gender}= req.body;

        // Check if user already exists
        let existingUser = await UserPet.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password',
            });
        }

        // Create a new user
        const user =await UserPet.create({
            name,
            email,
            password: hashedPassword,
            address,
            disease,
            age,
            phone,
            gender
        });
        
        user.family.push({
            name: name,
            gender: gender,
            age: age,
            relation: "Self",

            });
        await user.save();

        // Send the token in the response       
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                disease: user.disease,
                age: user.age,
                phone: user.phone,
                gender:user.gender
            },
        });
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists in pateient Table
        let user = await UserPet.findOne({ email });
        

        if(!user){
            return res.status(401).json({ message: "Invalid credentials" });
        }


        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: '1h' });
        // Set token in cookie  
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 360000000,  // 100 hour
        });


        // Send the token in the response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,  
            user,      
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
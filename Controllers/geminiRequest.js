import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const geminiRequest = async (req, res) => {
    try {
        const { message } = req.body;
        
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
              contents: [{ parts: [{ text: message }] }]
            }
          );
        const data = response.data;     
        return res.status(200).json({
            success: true,
            message: "Gemini API request successful",
            data: data,
        });
        
    } catch (error) {
        console.error('Error in geminiRequest:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}
const mongoose = require('mongoose');

const diabetesPredictionsSchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now
    },
    Pregnancies: {
        type: Number,
        required: true
    },
    Glucose: {
        type: Number,
        required: true
    },          
    BloodPressure: {    
        type: Number,
        required: true
    },
    SkinThickness: {
        type: Number,
        required: true
    },
    Insulin: {
        type: Number,
        required: true
    },
    BMI: {
        type: Number,
        required: true
    },
    DiabetesPedigreeFunction: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }   
})

const heartDiseaseSchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now
    },
    cp:{
        type: Number,
        required: true
    },
    trestbps:{
        type: Number,
        required: true
    },
    chol:{
        type: Number,
        required: true
    },
    fbs: {
        type: Number,
        required: true
    },
    restecg: {
        type: Number,
        required: true
    },
    thalach: {
        type: Number,
        required: true
    },
    exang:{
        type: Number,
        required: true
    },
    oldpeak: {
        type: Number,
        required: true
    },
    slope: {
        type: Number,
        required: true
    },
    ca:{
        type: Number,
        required: true
    },
    thal:{
        type: Number,
        required: true  
    },
    percentage:{
        type: Number,
        required: true
    }
});


const familyMemberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    relation: {
      type: String,
      required: true
    },
    age: {
      type: Number
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other']
    },
    heartPredictions:[heartDiseaseSchema],
    diabetesPredictions:[diabetesPredictionsSchema],

  });
const userPetSchema = new mongoose.Schema({
    role:{
        type: String,
        default: "patient"
    },
    name:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    disease:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    family: [familyMemberSchema],
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other']
    }

});

module.exports = mongoose.model('UserPet', userPetSchema);
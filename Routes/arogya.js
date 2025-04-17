const express=  require('express');
const router = express.Router();

const {getData} = require('../Controllers/getdata');
const {login,signup}= require('../Controllers/auth');
const {auth} = require('../Middlewares/auth');
const {addFamilyMember}=require('../Controllers/addFamilyMember');
const {postDiabetesTestData} = require('../Controllers/postDiabetesTestData');
const {postHeartDiseaseTestData} = require('../Controllers/postHeartDiseaseTestData');
router.post('/login', login);
router.post('/signup', signup);

router.post('/addFamilyMember', auth, addFamilyMember);
router.post('/postdiabetesPrediction', auth, postDiabetesTestData);
router.post('/postheartDiseasePrediction', auth, postHeartDiseaseTestData);
router.post("/test",auth,getData)

module.exports = router;
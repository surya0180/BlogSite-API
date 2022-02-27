const express = require('express');
const router =  express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const auth = require("../middlewares/auth.middleware");



const UserProfile = require("../models/profile.model")


//registering user
router.post('/createuser', [
    check('firstName', 'FirstName is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    check("email", 'Please include a valid email').isEmail(),
    check('password', "Please enter a valid password with 6 or more characters").isLength({min : 6})

], 
 async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors :  errors.array()});
    }
    const {firstName,lastName,email,password} = req.body;
    try {
        let user = await UserProfile.findOne({email});
        
        if(user){
            return res.status(400).json({errors : [{msg : "User already exists"}]})
        }

        user = new UserProfile({
            firstName,
            lastName,
            email,
            password,
            
          
           

            
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        console.log(user.id)
        const payload = {
            user : {
                id : user.id
            }
        }

        // eslint-disable-next-line no-undef
        jwt.sign(payload, process.env.jwtSecret,
            {expiresIn : 36000},
            (err, token)=>{
                if(err) throw err;
                res.json({token})

            }
        );

        await user.save();
        // res.json({req})
        // await res.status(200).json({req});
        console.log(req.body)
        console.log("user created");
        


    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
    

});


//Get my profile

router.get('/me', auth, async(req,res)=>{
    try {

        console.log(req.user);
        // console.log(user);
        const userprofile = await UserProfile.findOne({ _id : req.user.id});
        

        if(!userprofile){
            return res.status(500).json({msg : "You are not registered..."})
        }
        res.json(userprofile);
        // console.log(req.user);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
});


//Get all user profiles
router.get('/all', async(req,res)=>{
    try {

        
        // console.log(User)
        // console.log(req.user);
        // console.log(user);
        const userprofiles = await UserProfile.find();
        

        if(!userprofiles){
            return res.status(500).json({msg : "There are no profiles"})
        }
        res.json(userprofiles);
        // console.log(req.user);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
});


//Get by user id


router.get('/:user_id', async(req,res)=>{
    try {
        console.log(req.params.user_id)
        const userprofileid = await UserProfile.findOne({_id : req.params.user_id});
        
        console.log(userprofileid);
        if(!userprofileid){
            return res.status(500).json({msg : "There is no profile related to this user"})
        }
        res.json(userprofileid);
        // console.log(req.user);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})




module.exports = router;
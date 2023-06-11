const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/User");

// Get all users registred in DB
router.get("/", async (req, res) => {
    const users = await User.find();
    return res.status(200).json({Users: users});
});

// Get a user by his id
router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id)
    return res.status(200).json({User: user})
});

// Register a new user in DB (signup)
router.post("/register",  async (req, res) => {
    const plainPassword = req.body.password;
    bcrypt.hash(req.body.password,10, async (err, hash) => {
        if (err){
            throw err;
        }
        return await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
    })
    res.status(201).json(`Registred a new User successfully`)
})

// User login
router.post("/login" , async (req, res) => {
    try{
        const user =  User.findOne({email: req.body.email})
        if(!user)
        return res.status(404).json({message: "Login failed"})

        await bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err)
            return err;
        })
        
        const token = jwt.sign(
            {
                userID: user._id,
                username: user.username, 
                email: user.email, 
            },
            'mySecretPhrase',
            {expiresIn: "7 days"}
        );
        return res.status(200).json({token: token})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
})

// Update user profile using his id
router.put("/:id", async (req, res) => {
    const newUser = req.body
    const plainTextPassword = req.body.password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        newUser.password = hash
      
        const updatedUser = User.findByIdAndUpdate(req.params.id, newUser)
        return res.status(201).json(`updated user successfully`);
    })
})

// Delete a user account using his id
router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json(`Deleted user successfully`);
});

module.exports = router;
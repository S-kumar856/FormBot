// const express = require('express');
// const router = express.Router();
// const User = require('../schema/user.schema');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// // register user page
// router.post('/register', async (req, res) => {
//     const {username, email, password} = req.body;
//     const isUserExist = await User.findOne({email});
//     if(isUserExist){
//         return res.status(400).json({message: 'User already exist'});
//     }

//     // hasing the password using gensalt and hash
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

// //  creating new user if user doesnot exists
//     try {
//         const user = User.create({
//             username,
//             email,
//             password: hashedPassword,
//         });
//         res.status(200).json({message: "User Created Successfully"})
//     } catch (error) {
//         res.status(500).json({message: "Error in creating user"})  
//     }
// });

// //  login page
// router.post('/login', async (req, res) => {
//     const {email, password} = req.body;
//     const user = await User.findOne({email});
//     if(!user){
//         return res.status(400).json({message: 'Wrong username or password'});
//     }

//     // comparing the registered user password and login user password
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if(!isPasswordCorrect){
//         return res.status(400).json({message: 'Wrong username or password'});
//     }
//     // accessing id from the user as a payload which used in token renerate
//     const payLoad = {
//         id: user._id,
//     }
//     //  generating jsonwebtokens (tokens)
//     const token = jwt.sign(payLoad, process.env.SECRET_JWT ,{
//         expiresIn: '4h',});
//     res.cookie("token", token);
//     res.status(200).json({token})
// });

// module.exports = router;

// -------------------------------------------------------------------



const express = require('express');
const { check, validationResult } = require('express-validator');
const { registerUser, loginUser, updateUser, getUser} = require('../controllers/user.Controller');
const auth = require('../middlewares/AuthMiddleware');


const router = express.Router();

// Register a user
router.post(
  '/register',
  [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  registerUser
);

// Login a user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  loginUser
);


// update user
router.put(
  "/updateUser",
  auth,
  [
    // Validate fields only if they are present in the request
    check("userName")
      .optional()
      .not()
      .isEmpty()
      .withMessage("userName is required"),
    check("email")
      .optional()
      .isEmail()
      .withMessage("Please include a valid email"),
    check("newPassword")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the updateUser controller function
    updateUser(req, res);
  }
);

router.get("/getUser", auth, getUser);

module.exports = router;

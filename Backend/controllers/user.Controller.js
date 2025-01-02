const User = require('../schema/user.schema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    //  hasing the password using gensalt and hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the user
    await user.save();

    // Create and return JWT
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '4h' });

    res.status(200).json({message: "User Created Successfully", token });
  } catch (error) {
    res.status(500).json({ msg:  "Error in creating user" });
  }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Check if password matches (assuming you use bcrypt for password encryption)
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate a JWT token with user id and email
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_JWT,{
          expiresIn: '4h',
        });

        res.cookie("token", token)
        res.status(200).json({ success: true, token });

    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


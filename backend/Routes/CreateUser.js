const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const User = require('../modals/User');

const bcrypt = require('bcryptjs');
const jwtSecreat = "myNameShivamyrai$#"


// Validation middleware for creating a new User

const validateUser = [
  body('username').trim().isLength({ min: 1 }).withMessage('Username is required'),
  body('email').trim().isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]


// Create a new user
router.post('/createusers', validateUser, async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }



    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create a new user using the User model
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// User login
router.post('/loginuser', validateUser.slice(1, 2), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

   // Compare the provided password with the hashed password in the database
   const passwordMatch = await bcrypt.compare(password, user.password);
   if (!passwordMatch) {
     return res.status(401).json({ error: 'Invalid credentials' });
   }

     // Generate a JSON Web Token (JWT) for authentication
     const token = jwt.sign({ userId: user._id }, jwtSecreat , { expiresIn: '1h' });

     res.json({ authtoken: token , success: true });

  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get all users

router.get('/users', async (req, res) => {
  try {
    // Fetch all users using the User model
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

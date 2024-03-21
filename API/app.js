// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Initialize Express app
const app = express();
const port = 3000; // You can change the port as needed

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define User schema
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Define User model
const User = mongoose.model('User', userSchema);

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Only JPEG, PNG, and GIF images are allowed.');
        }
    }
}).single('image');

// Middleware to parse JSON bodies
app.use(express.json());

// User Creation endpoint
app.post('/user/create', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update User Details endpoint
app.put('/user/edit', async (req, res) => {
    try {
        const { fullName, password } = req.body;
        const email = req.user.email; // Assuming user email is in the request object
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update user details
        user.fullName = fullName;
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete User endpoint
app.delete('/user/delete', async (req, res) => {
    try {
        const email = req.user.email; // Assuming user email is in the request object
        await User.findOneAndDelete({ email });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve All Users endpoint
app.get('/user/getAll', async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Upload Image endpoint
app.post('/user/uploadImage', async (req, res) => {
    try {
        upload(req, res, async function(err) {
            if (err) {
                return res.status(400).json({ message: err });
            }
            // Save the file path in the database
            const imagePath = req.file.path;
            // Assuming user email is in the request object
            const email = req.user.email;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Update user document with image path
            user.imagePath = imagePath;
            await user.save();
            res.status(200).json({ message: 'Image uploaded successfully', imagePath });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

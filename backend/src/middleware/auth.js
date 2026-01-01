const bcrypt = require('bcrypt');
const User = require('./userModel');

// Signup function
const signup = async (email, password) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();
    return { success: true, message: 'User created successfully', user: { email: newUser.email } };
  } catch (error) {
    return { success: false, message: 'Error creating user', error: error.message };
  }
};

// Login function
const login = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid password' };
    }

    return { success: true, message: 'Login successful', user: { email: user.email } };
  } catch (error) {
    return { success: false, message: 'Error logging in', error: error.message };
  }
};

module.exports = { signup, login };

import User from "../models/User.js";
import bcrypt from "bcrypt";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { Name, Email, Phone, Password, Role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = await User.create({
      Name,
      Email,
      Phone,
      Password: hashedPassword,
      Role,
    });

    res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["Password"] } }); // Exclude password from response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error: error.message });
  }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ["Password"] } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
};

// Update user details
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash new password if provided
    if (req.body.Password) {
      req.body.Password = await bcrypt.hash(req.body.Password, 10);
    }

    await user.update(req.body);
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    console.log(Email)

    // Find user by email
    const user = await User.findOne({ where: { Email } });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid email or password" });

    // Exclude password from response
    const userData = {
      UserID: user.UserID,
      Name: user.Name,
      Email: user.Email,
      Phone: user.Phone,
      Role: user.Role,
    };

    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

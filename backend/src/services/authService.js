import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

const register = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw new Error("All fields required");
    }

    const exists = await User.findOne({ email });
    if (exists) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed
    });

    const token = generateToken(user);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        token
    };
};

const login = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("All fields required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = generateToken(user);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        token
    };
};

export default { register, login };
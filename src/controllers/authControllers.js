import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import generateToken from '../utils/generateToken.js';


export const register = async (req, res) => {
try {
const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
const exists = await User.findOne({ where: { username } });
if (exists) return res.status(400).json({ message: 'Username taken' });
const hashed = await bcrypt.hash(password, 10);
const user = await User.create({ username, password: hashed });
return res.status(201).json({ id: user.user_id, username: user.username, token: generateToken(user.user_id) });
} catch (err) {
console.error('Register error', err);
return res.status(500).json({ message: err.message });
}
};


export const login = async (req, res) => {
try {
const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
const user = await User.findOne({ where: { username } });
if (!user) return res.status(400).json({ message: 'User not found' });
const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ message: 'Wrong password' });
return res.json({ id: user.user_id, username: user.username, token: generateToken(user.user_id) });
} catch (err) {
console.error('Login error', err);
return res.status(500).json({ message: err.message });
}
};
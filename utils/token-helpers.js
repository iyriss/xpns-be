import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Short-lived
export function generateAccessToken(user) {
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '48h' }
  );
  console.log('Generated token:', token);
  return token;
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

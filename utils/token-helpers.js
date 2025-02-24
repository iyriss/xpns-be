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
    { expiresIn: '15m' }
  );
  console.log('Generated token:', token);
  return token;
}

// Long-lived
export function generateRefreshToken(user) {
  return jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: '7d',
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_SECRET);
}

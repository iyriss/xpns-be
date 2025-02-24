import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (token) {
    try {
      // If the token is base64 encoded, decode it first
      const decodedToken = Buffer.from(token, 'base64').toString();
    } catch (e) {
      console.log('Token is not base64 encoded');
    }
  }

  if (!token) {
    console.log('No token found in cookies');
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export default authMiddleware;

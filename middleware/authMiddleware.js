const jwt = require('jsonwebtoken');
const User = require('../models/user');
exports.protect = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'DEVCORE_SECRET');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (e) { res.status(401).json({ message: 'Not authorized' }); }
  } else { res.status(401).json({ message: 'No token' }); }
};
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') next();
  else res.status(403).json({ message: 'Admin access required' });
};

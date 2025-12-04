export const requireRole = (...roles) => {
  return (req, res, next) => {
    // check user role for protected route
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "forbidden" });
    }
    next();
  };
};

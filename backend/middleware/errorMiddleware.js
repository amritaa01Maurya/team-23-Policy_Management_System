export const errorHandler = (err, req, res, next) => {
  // central error handler
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "server error"
  });
};

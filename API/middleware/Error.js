const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  return res.status(statusCode).json({
    status: statusCode,
    message: err.message || "Oups, they are a problem",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
};

export default globalErrorHandler;
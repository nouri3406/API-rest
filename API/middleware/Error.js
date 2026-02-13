const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: statusCode,
        message: err.message || "Oups, un problème est survenu",
        error: process.env.NODE_ENV === 'production' ? {} : err.stack
    });
};

export default globalErrorHandler;
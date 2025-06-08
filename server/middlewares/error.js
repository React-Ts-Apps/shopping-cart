
//eslint-disable-next-line 
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV == 'development') {
        return res.status(statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err
        });
    }

    // For production
    if (process.env.NODE_ENV == 'production') {
        let message = err.message

        if (err.name == 'ValidationError') {
            message = Object.values(err.errors).map(value => value.message)
        }

        if (err.name == 'CastError') {
            message = 'Rosource not found'
        }

        const error = new Error(message)

        res.status(statusCode).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }

};

export default errorMiddleware;

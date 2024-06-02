import { ErrorHandler } from '../utils/errorHandler.js';

export const errorHandlerMiddleware = (err, req, res, next) => {
  // If err is not an instance of ErrorHandler, treat it as an internal server error
  if (!(err instanceof ErrorHandler)) {
    err = new ErrorHandler(
      err.statusCode || 500,
      err.message || 'Internal server error'
    );
  }
  res.status(err.statusCode);
  if (req.accepts('html')) {
    res.render('error', {
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    res.json({ success: false, error: err.message });
  }
};

// handling handleUncaughtError  Rejection
export const handleUncaughtError = () => {
  process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('shutting down server bcz of uncaughtException');
  });
};

import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

// Create a custom formatter for request logging
const requestFormat = winston.format.printf(({ level, message, timestamp, origin, allowedOrigin }) => {
  return `${timestamp} ${level}: ${message} | Origin: ${origin} | Allowed Origin: ${allowedOrigin}`;
});

// Create Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    requestFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Middleware to log request origins
export const requestOriginLogger = (req, res, next) => {
  const origin = req.get('host') || 'No origin';
  const allowedOrigin = process.env.FRONTEND_URL || 'No allowed origin set';

  logger.info('Incoming Request', {
    origin,
    allowedOrigin
  });

  next();
};

export default logger;
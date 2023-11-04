import winston from 'winston';

export default (() => {
  const levels = { error: 0, warn: 1, debug: 2, info: 3 };
  const colors = { error: 'red', warn: 'yellow', debug: 'blue', info: 'green' };

  winston.addColors(colors);

  return winston.createLogger({
    levels,
    format: winston.format.combine(
      winston.format.colorize({ level: true, message: false }),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS',
      }),
      winston.format.printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`),
    ),
    transports: [new winston.transports.Console()],
  });
})();

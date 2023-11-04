import http from 'http';
import app from './src/app';
import config from './src/configs/app.config';
import logger from './src/helpers/winston.helper';

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const PORT = normalizePort(config.APP_PORT || 5000);

app.set('port', PORT);

const server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);

      process.exit(1);

    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);

      process.exit(1);

    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `PORT ${addr.port}`;

  logger.info(`Listening on ${bind}`);
};

server.on('error', onError);
server.on('listening', onListening);

server.listen(PORT);

import { Status, Reason } from '../constants';
import { mapResponse } from '../core/error.response';

export default (err, req, res, next) => {
  const statusCode = err.status || Status.INTERNAL_SERVER_ERROR;
  const message = err.message || Reason.INTERNAL_SERVER_ERROR;
  const reason = mapResponse[statusCode] || Reason.INTERNAL_SERVER_ERROR;
  const stack = statusCode >= Status.INTERNAL_SERVER_ERROR ? err.stack : `ERROR: ${message}`;

  res.status(statusCode).json({ status: statusCode, reason, message: stack });
};

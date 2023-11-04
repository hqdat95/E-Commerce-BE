import { Status, Reason } from '../constants';

export default (err, req, res, next) => {
  const statusCode = err.status || Status.INTERNAL_SERVER_ERROR;
  const message = err.message || Reason.INTERNAL_SERVER_ERROR;

  res.locals.message = message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(statusCode);
  res.render('error');
};

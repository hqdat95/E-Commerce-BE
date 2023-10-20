import { Reason, Status } from '../constants';

export class Success {
  constructor(res) {
    this.res = res;
    this.messageMap = {
      [Reason.OK]: Reason.OK,
      [Reason.CREATED]: Reason.CREATED,
    };
  }

  send(reason, status, data) {
    const message = this.messageMap[reason] || 'Success';
    const response = {
      reason: message,
      status,
      data: typeof data === 'string' ? { message: data } : data,
    };

    this.res.status(status).json(response);
  }

  ok(data) {
    this.send(Reason.OK, Status.OK, data);
  }

  created(data) {
    this.send(Reason.CREATED, Status.CREATED, data);
  }
}

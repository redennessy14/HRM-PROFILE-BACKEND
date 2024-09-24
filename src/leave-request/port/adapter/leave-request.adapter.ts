import { Injectable } from '@nestjs/common';

@Injectable()
export class LeaveRequestAdapter {
  constructor() {}
  request(): string {
    return 'request finished';
  }
}

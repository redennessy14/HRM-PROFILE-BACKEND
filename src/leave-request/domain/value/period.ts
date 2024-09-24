import { ForbiddenException } from '@nestjs/common';

export class Period {
  private readonly startDate: Date;
  private readonly endDate: Date;

  constructor(startDate: Date, endDate: Date) {
    if (endDate < startDate) {
      throw new ForbiddenException(
        'Конец отгула не может быть меньше даты начало',
      );
    }
    this.startDate = startDate;
    this.endDate = endDate;
  }

  get daysCount(): number {
    return (
      (this.endDate.getTime() - this.startDate.getTime()) /
        (1000 * 60 * 60 * 24) +
      1
    );
  }

  get start(): Date {
    return this.startDate;
  }

  get end(): Date {
    return this.endDate;
  }
}

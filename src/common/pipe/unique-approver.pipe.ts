import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateLeaveRequestDto } from '../../leave-request/port/resource/dto';

export class UniqueApproverPipe implements PipeTransform {
  transform(value: CreateLeaveRequestDto) {
    const { employeeId, approvals } = value;

    if (approvals.includes(employeeId)) {
      throw new BadRequestException(
        'Вы не можете быть утвердителем в своей заявке',
      );
    }
    return value;
  }
}

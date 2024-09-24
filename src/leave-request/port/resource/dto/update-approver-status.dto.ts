import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApprovalStatus } from 'src/leave-request/domain/enum';

export class UpdateApproverStatusDto {
  @IsEnum(ApprovalStatus)
  @IsNotEmpty()
  status: ApprovalStatus;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { LeaveType } from 'src/leave-request/domain/enum';

export class CreateLeaveRequestDto {
  @IsString()
  @IsOptional()
  employeeId: string;

  @ApiProperty({
    description: 'Тип отпуска',
    enum: LeaveType,
    example: LeaveType.VACATION,
  })
  @IsEnum(LeaveType)
  @IsNotEmpty()
  type: LeaveType;

  @ApiProperty({
    description: 'Дата начала отпуска в формате дд/мм/гггг',
    example: '01/01/2024',
  })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'Дата окончания отпуска в формате дд/мм/гггг',
    example: '10/01/2024',
  })
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({
    description: 'Список ID утверждений',
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1, {
    message: 'Для создания запроса нужен минимум 1 утвердитель',
  })
  @IsNotEmpty()
  approvals: string[];
}

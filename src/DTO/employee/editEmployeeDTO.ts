import { ApiProperty } from '@nestjs/swagger';

export class EditEmployeeDTO {
  @ApiProperty()
  readonly name?: string;

  @ApiProperty({ required: false })
  readonly surname?: string;

  @ApiProperty({ required: false })
  readonly phoneNumber?: string;

  @ApiProperty({ required: false })
  readonly pesel?: string;

  @ApiProperty({ required: false })
  readonly position?: string;

  @ApiProperty({ required: false })
  readonly salary?: number;
}

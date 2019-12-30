import { ApiProperty } from '@nestjs/swagger';

export class EditEmployeeDTO {
  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly surname?: string;

  @ApiProperty()
  readonly phoneNumber?: string;

  @ApiProperty()
  readonly pesel?: string;

  @ApiProperty()
  readonly position?: string;

  @ApiProperty()
  readonly salary?: number;
}

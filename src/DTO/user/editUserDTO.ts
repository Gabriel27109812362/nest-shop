import { ApiProperty } from '@nestjs/swagger';

export class EditUserDTO {
  @ApiProperty({ required: false })
  readonly login?: string;

  @ApiProperty({ required: false })
  readonly password?: string;

  @ApiProperty({ required: false })
  readonly email: string;

  @ApiProperty({ required: false })
  readonly role?: 'employee' | 'client';
}

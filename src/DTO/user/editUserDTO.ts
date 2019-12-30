import { ApiProperty } from '@nestjs/swagger';

export class EditUserDTO {
  @ApiProperty()
  readonly login?: string;

  @ApiProperty()
  readonly password?: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly role?: 'employee' | 'client';
}

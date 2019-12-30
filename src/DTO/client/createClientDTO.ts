import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly surname: string;

  @ApiProperty()
  readonly phoneNumber: string;

  @ApiProperty()
  readonly pesel: string;
}

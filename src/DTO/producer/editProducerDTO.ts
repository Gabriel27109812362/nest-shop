import { ApiProperty } from '@nestjs/swagger';

export class EditProducerDTO {
  @ApiProperty()
  readonly name?: string;
  @ApiProperty()
  readonly email?: string;
  @ApiProperty()
  readonly phoneNumber?: string;
}

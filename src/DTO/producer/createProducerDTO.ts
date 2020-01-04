import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDTO {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly phoneNumber: string;

}

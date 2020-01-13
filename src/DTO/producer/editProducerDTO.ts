import { ApiProperty } from '@nestjs/swagger';

export class EditProducerDTO {
  @ApiProperty({ required: false })
  readonly name?: string;
  @ApiProperty({ required: false })
  readonly email?: string;
  @ApiProperty({ required: false })
  readonly phoneNumber?: string;
}

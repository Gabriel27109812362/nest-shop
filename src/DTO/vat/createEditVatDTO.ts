import { ApiProperty } from '@nestjs/swagger';

export class CreateEditVatDTO {
  @ApiProperty()
  readonly value: number;
}

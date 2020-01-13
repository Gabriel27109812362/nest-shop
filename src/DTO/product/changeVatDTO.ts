import { ApiProperty } from '@nestjs/swagger';

export class ChangeVatDTO {
  @ApiProperty()
  readonly idProduct: number;

  @ApiProperty()
  readonly idVat: number;

}

import { ApiProperty } from '@nestjs/swagger';

export class ChangeStoreHouseDTO {
  @ApiProperty()
  readonly idProduct: number;

  @ApiProperty()
  readonly idStoreHouse: number;

}

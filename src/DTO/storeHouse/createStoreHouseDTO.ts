import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreHouseDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly area: number;

  @ApiProperty()
  readonly rentCost: number;
}

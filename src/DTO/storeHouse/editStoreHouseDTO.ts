import { ApiProperty } from '@nestjs/swagger';

export class EditStoreHouseDTO {
  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly area?: number;

  @ApiProperty()
  readonly rentCost?: number;
}

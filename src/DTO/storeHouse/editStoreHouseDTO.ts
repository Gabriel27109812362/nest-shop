import { ApiProperty } from '@nestjs/swagger';

export class EditStoreHouseDTO {
  @ApiProperty({ required: false })
  readonly name?: string;

  @ApiProperty({ required: false })
  readonly area?: number;

  @ApiProperty({ required: false })
  readonly rentCost?: number;
}

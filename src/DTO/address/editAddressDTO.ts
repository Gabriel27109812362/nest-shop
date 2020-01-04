import { ApiProperty } from '@nestjs/swagger';

export class EditAddressDTO {
  @ApiProperty({ required: false })
  readonly town?: string;

  @ApiProperty({ required: false })
  readonly province?: string;

  @ApiProperty({ required: false })
  readonly postCode?: string;

  @ApiProperty({ required: false })
  readonly street?: string;

  @ApiProperty({ required: false })
  readonly houseNumber?: string;

  @ApiProperty({ required: false })
  readonly flatNumber?: number;
}

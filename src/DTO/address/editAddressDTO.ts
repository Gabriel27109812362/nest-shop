import { ApiProperty } from '@nestjs/swagger';

export class EditAddressDTO {
  @ApiProperty()
  readonly town?: string;

  @ApiProperty()
  readonly province?: string;

  @ApiProperty()
  readonly postCode?: string;

  @ApiProperty()
  readonly street?: string;

  @ApiProperty()
  readonly houseNumber?: string;

  @ApiProperty()
  readonly flatNumber?: number;
}

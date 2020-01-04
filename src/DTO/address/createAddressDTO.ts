import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDTO {
  @ApiProperty()
  readonly town: string;

  @ApiProperty()
  readonly province: string;

  @ApiProperty()
  readonly postCode: string;

  @ApiProperty()
  readonly street: string;

  @ApiProperty()
  readonly houseNumber: string;

  @ApiProperty({ required: false })
  readonly flatNumber?: number;
}

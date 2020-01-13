import { ApiProperty } from '@nestjs/swagger';

export class ConnectAddressWithClientDTO {
  @ApiProperty()
  readonly idClient: number;

  @ApiProperty()
  readonly idAddress: number;
}

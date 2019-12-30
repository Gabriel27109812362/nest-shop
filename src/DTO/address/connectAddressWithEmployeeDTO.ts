import { ApiProperty } from '@nestjs/swagger';

export class ConnectAddressWithEmployeeDTO {
  @ApiProperty()
  readonly idEmployee: number;
  @ApiProperty()
  readonly idAddress: number;
}

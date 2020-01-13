import { ApiProperty } from '@nestjs/swagger';

export class ConnectClientWithUserDTO {
  @ApiProperty()
  readonly idClient: number;

  @ApiProperty()
  readonly idUser: number;
}

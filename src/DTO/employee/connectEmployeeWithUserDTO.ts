import { ApiProperty } from '@nestjs/swagger';

export class ConnectEmployeeWithUserDTO {
  @ApiProperty()
  readonly idEmployee: number;

  @ApiProperty()
  readonly idUser: number;

}

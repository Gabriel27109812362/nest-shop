import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly magazineState: number;

  @ApiProperty()
  readonly unitOfMeasure: string;

  @ApiProperty()
  readonly idStore: number;

  @ApiProperty()
  readonly idVat: number;
}

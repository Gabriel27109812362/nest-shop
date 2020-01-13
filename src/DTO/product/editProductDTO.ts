import { ApiProperty } from '@nestjs/swagger';

export class EditProductDTO {
  @ApiProperty({ required: false })
  readonly name?: string;

  @ApiProperty({ required: false })
  readonly magazineState?: number;

  @ApiProperty({ required: false })
  readonly unitOfMeasure?: string;

}

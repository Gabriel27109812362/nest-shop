import { ApiProperty } from '@nestjs/swagger';

export class AddCategoriesDTO {
  @ApiProperty()
  idProduct: number;

  @ApiProperty({ type: [Number] })
  idCategories: number[];
}

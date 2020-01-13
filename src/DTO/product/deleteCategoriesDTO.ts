import { ApiProperty } from '@nestjs/swagger';

export class DeleteCategoriesDTO {
  @ApiProperty()
  readonly idProduct: number;

  @ApiProperty({ type: [Number] })
  readonly idCategories: number[];

}

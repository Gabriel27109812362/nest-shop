import { ApiProperty } from '@nestjs/swagger';

export class CreateEditCategoryDTO {
  @ApiProperty()
  readonly name: string;
}

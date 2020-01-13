import { ApiProperty } from '@nestjs/swagger';

export class EditClientDTO {
  @ApiProperty({ required: false })
  readonly name?: string;

  @ApiProperty({ required: false })
  readonly surname?: string;

  @ApiProperty({ required: false })
  readonly phoneNumber?: string;

  @ApiProperty({ required: false })
  readonly pesel?: string;
}

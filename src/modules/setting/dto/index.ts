import { ApiProperty } from '@nestjs/swagger';

export class timePostDTO {
  @ApiProperty({ type: Date })
  time: Date;
}

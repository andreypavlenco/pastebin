import { ApiProperty } from '@nestjs/swagger';

export class savePostDto {
  @ApiProperty({ type: String })
  text: string;
}

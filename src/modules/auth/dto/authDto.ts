import { ApiProperty } from '@nestjs/swagger';

export class authDto {
  @ApiProperty({ type: String })
  username: string;
  @ApiProperty({ type: String })
  password: string;
  @ApiProperty({ type: String })
  email: string;
}

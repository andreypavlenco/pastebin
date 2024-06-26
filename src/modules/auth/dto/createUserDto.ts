import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
  @ApiProperty({ type: String })
  username: string;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
  refreshToken: string;
}

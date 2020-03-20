
import { ApiProperty } from '@nestjs/swagger';
export class UsersDTO {
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
}
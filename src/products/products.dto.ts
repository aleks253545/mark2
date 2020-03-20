import { ApiProperty } from '@nestjs/swagger';
export class ProductsDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  descriptiton: string;

  @ApiProperty()
  quantity: string;

  @ApiProperty()
  userId: string;
}
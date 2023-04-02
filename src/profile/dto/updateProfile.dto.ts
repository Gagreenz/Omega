import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProfileDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

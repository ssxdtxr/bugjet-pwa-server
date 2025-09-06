import {
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear() + 5)
  year: number;

  @IsString()
  genre: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  director?: string;
}

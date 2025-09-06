import {
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Название фильма',
    example: 'Крестный отец',
    maxLength: 255,
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Описание фильма',
    example: 'Эпическая история сицилийской мафиозной семьи',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Год выпуска фильма',
    example: 1972,
    minimum: 1888,
    maximum: new Date().getFullYear() + 5,
  })
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear() + 5)
  year: number;

  @ApiProperty({
    description: 'Жанр фильма',
    example: 'Криминал',
    maxLength: 100,
  })
  @IsString()
  genre: string;

  @ApiProperty({
    description: 'Длительность фильма в минутах',
    example: 175,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  duration: number;

  @ApiPropertyOptional({
    description: 'Рейтинг фильма от 0 до 10',
    example: 9.2,
    minimum: 0,
    maximum: 10,
    nullable: true,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({
    description: 'Режиссер фильма',
    example: 'Фрэнсис Форд Коппола',
    maxLength: 255,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  director?: string;
}

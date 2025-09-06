import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiPropertyOptional({
    description: 'Название фильма',
    example: 'Крестный отец: Часть II',
    required: false,
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Описание фильма',
    example: 'Продолжение эпической истории',
    required: false,
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Год выпуска фильма',
    example: 1974,
    required: false,
  })
  year?: number;

  @ApiPropertyOptional({
    description: 'Жанр фильма',
    example: 'Криминал',
    required: false,
  })
  genre?: string;

  @ApiPropertyOptional({
    description: 'Длительность фильма в минутах',
    example: 200,
    required: false,
  })
  duration?: number;

  @ApiPropertyOptional({
    description: 'Рейтинг фильма',
    example: 9.0,
    required: false,
  })
  rating?: number;

  @ApiPropertyOptional({
    description: 'Режиссер фильма',
    example: 'Фрэнсис Форд Коппола',
    required: false,
  })
  director?: string;
}
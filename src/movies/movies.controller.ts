import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый фильм' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Фильм успешно создан',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Неверные данные запроса',
  })
  @ApiBody({ type: CreateMovieDto })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все фильмы' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список всех фильмов',
  })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Поиск фильмов' })
  @ApiQuery({
    name: 'q',
    description: 'Поисковый запрос',
    example: 'криминал',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Результаты поиска',
  })
  search(@Query('q') query: string) {
    return this.moviesService.search(query);
  }

  @Get('genre/:genre')
  @ApiOperation({ summary: 'Получить фильмы по жанру' })
  @ApiParam({
    name: 'genre',
    description: 'Жанр фильма',
    example: 'криминал',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Фильмы указанного жанра',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Фильмы не найдены',
  })
  findByGenre(@Param('genre') genre: string) {
    return this.moviesService.findByGenre(genre);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить фильм по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID фильма',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Информация о фильме',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Фильм не найден',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить фильм' })
  @ApiParam({
    name: 'id',
    description: 'ID фильма',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Фильм успешно обновлен',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Фильм не найден',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Неверные данные запроса',
  })
  @ApiBody({ type: UpdateMovieDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить фильм' })
  @ApiParam({
    name: 'id',
    description: 'ID фильма',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Фильм успешно удален',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Фильм не найден',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id);
  }
}
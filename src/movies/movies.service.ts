import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  @ApiOperation({ summary: 'Создать новый фильм' })
  @ApiResponse({
    status: 201,
    description: 'Фильм успешно создан',
    example: {
      id: 1,
      title: 'Крестный отец',
      description: 'Эпическая история сицилийской мафиозной семьи',
      year: 1972,
      genre: 'Криминал',
      duration: 175,
      rating: 9.2,
      director: 'Фрэнсис Форд Коппола',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Неверные данные запроса',
  })
  async create(createMovieDto: CreateMovieDto) {
    return this.prisma.movie.create({
      data: createMovieDto,
    });
  }

  @ApiOperation({ summary: 'Получить все фильмы' })
  @ApiResponse({
    status: 200,
    description: 'Список всех фильмов',
    example: [
      {
        id: 1,
        title: 'Крестный отец',
        description: 'Эпическая история сицилийской мафиозной семьи',
        year: 1972,
        genre: 'Криминал',
        duration: 175,
        rating: 9.2,
        director: 'Фрэнсис Форд Коппола',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 2,
        title: 'Криминальное чтиво',
        description: 'Истории преступников Лос-Анджелеса',
        year: 1994,
        genre: 'Криминал',
        duration: 154,
        rating: 8.9,
        director: 'Квентин Тарантино',
        createdAt: '2024-01-02T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      },
    ],
  })
  async findAll() {
    return this.prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @ApiOperation({ summary: 'Получить фильм по ID' })
  @ApiResponse({
    status: 200,
    description: 'Информация о фильме',
    example: {
      id: 1,
      title: 'Крестный отец',
      description: 'Эпическая история сицилийской мафиозной семьи',
      year: 1972,
      genre: 'Криминал',
      duration: 175,
      rating: 9.2,
      director: 'Фрэнсис Форд Коппола',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Фильм не найден',
  })
  async findOne(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  @ApiOperation({ summary: 'Обновить фильм' })
  @ApiResponse({
    status: 200,
    description: 'Фильм успешно обновлен',
    example: {
      id: 1,
      title: 'Крестный отец: Специальная версия',
      description: 'Обновленная версия классического фильма',
      year: 1972,
      genre: 'Криминал',
      duration: 175,
      rating: 9.5,
      director: 'Фрэнсис Форд Коппола',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-03T00:00:00.000Z',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Фильм не найден',
  })
  @ApiResponse({
    status: 400,
    description: 'Неверные данные запроса',
  })
  async update(id: number, updateMovieDto: UpdateMovieDto) {
    try {
      return await this.prisma.movie.update({
        where: { id },
        data: updateMovieDto,
      });
    } catch (error) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
  }

  @ApiOperation({ summary: 'Удалить фильм' })
  @ApiResponse({
    status: 200,
    description: 'Фильм успешно удален',
    example: {
      id: 1,
      title: 'Крестный отец',
      description: 'Эпическая история сицилийской мафиозной семьи',
      year: 1972,
      genre: 'Криминал',
      duration: 175,
      rating: 9.2,
      director: 'Фрэнсис Форд Коппола',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Фильм не найден',
  })
  async remove(id: number) {
    try {
      return await this.prisma.movie.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
  }

  @ApiOperation({ summary: 'Получить фильмы по жанру' })
  @ApiResponse({
    status: 200,
    description: 'Фильмы указанного жанра',
    example: [
      {
        id: 1,
        title: 'Крестный отец',
        description: 'Эпическая история сицилийской мафиозной семьи',
        year: 1972,
        genre: 'Криминал',
        duration: 175,
        rating: 9.2,
        director: 'Фрэнсис Форд Копполa',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 2,
        title: 'Криминальное чтиво',
        description: 'Истории преступников Лос-Анджелеса',
        year: 1994,
        genre: 'Криминал',
        duration: 154,
        rating: 8.9,
        director: 'Квентин Тарантино',
        createdAt: '2024-01-02T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      },
    ],
  })
  @ApiResponse({
    status: 404,
    description: 'Фильмы не найдены',
  })
  async findByGenre(genre: string) {
    const movies = await this.prisma.movie.findMany({
      where: {
        genre: {
          equals: genre,
          mode: 'insensitive',
        },
      },
      orderBy: {
        rating: 'desc',
      },
    });

    if (movies.length === 0) {
      throw new NotFoundException(`Movies with genre '${genre}' not found`);
    }

    return movies;
  }

  @ApiOperation({ summary: 'Поиск фильмов' })
  @ApiResponse({
    status: 200,
    description: 'Результаты поиска',
    example: [
      {
        id: 1,
        title: 'Крестный отец',
        description: 'Эпическая история сицилийской мафиозной семьи',
        year: 1972,
        genre: 'Криминал',
        duration: 175,
        rating: 9.2,
        director: 'Фрэнсис Форд Коппола',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  })
  @ApiResponse({
    status: 404,
    description: 'Фильмы не найдены',
  })
  async search(query: string) {
    const movies = await this.prisma.movie.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            director: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    if (movies.length === 0) {
      throw new NotFoundException(`Movies with query '${query}' not found`);
    }

    return movies;
  }
}
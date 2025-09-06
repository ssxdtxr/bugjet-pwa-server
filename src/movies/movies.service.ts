import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    return this.prisma.movie.create({
      data: createMovieDto,
    });
  }

  async findAll() {
    return this.prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

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

  async remove(id: number) {
    try {
      return await this.prisma.movie.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
  }

  async findByGenre(genre: string) {
    return this.prisma.movie.findMany({
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
  }

  async search(query: string) {
    return this.prisma.movie.findMany({
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
  }
}

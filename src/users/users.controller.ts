import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { DeleteResult } from 'typeorm';
import { CreateResult, FindAllResult } from 'src/interfaces';
import { UserQueryDto } from './dto/query-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateResult> {
    const tempUser = await this.usersService.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    if (tempUser) throw new BadRequestException('username already in use');

    const res = await this.usersService.create(createUserDto);

    return { id: res.id };
  }

  @Get()
  async findAll(@Query() query: UserQueryDto): Promise<FindAllResult<User>> {
    return this.usersService.findAll({
      where: {},
      take: query.limit,
      skip: query.skip,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.usersService.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findOne(id: number) {
    //this.usersRepository.findOne({});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
  }

  remove(id: number) {
  }
}

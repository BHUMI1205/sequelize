// src/users/users.service.ts
import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { users } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(users)
    private readonly userModel: typeof users,
    private readonly jwtService: JwtService
  ) { }


  async create(createUserDto) {
    let hash = await bcrypt.hash(createUserDto.password, 10)
    let data = this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hash
    });
    return {
      status: HttpStatus.CREATED,
      data: data,
      message: 'User Created'
    }
  }

  async login(createUserDto) {
    let data = await this.userModel.findOne({
      where: {
        email: createUserDto.email
      }
    });
    if (data) {
      data = data.dataValues;
      let user = await bcrypt.compare(createUserDto.password, data.password)
      if (user) {
        let payload = { id: data.id, email: data.email }
        var token = await this.jwtService.sign(payload, { secret: process.env.SECRET_KEY });
        return {
          status: HttpStatus.CREATED,
          message: 'This action login a user',
          token: token
        }
      } else {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'password is wrong',
        }
      }
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'email is wrong',

      }
    }
  }

  async findAll() {
    let data = await this.userModel.findAll();
    return {
      status: HttpStatus.CREATED,
      data: data,
      message: 'Find all Users'
    }
  }

  async findOne(id) {
    let data = await this.userModel.findOne({
      where: {
        id: id
      }
    });
    return {
      status: HttpStatus.OK,
      data: data,
      message: `Find id:${id} User`
    }
  }

  async update(id, updateUserDto) {
    let data = this.userModel.update(
      updateUserDto, {
      where: {
        id: id
      }
    });
    return {
      status: HttpStatus.OK,
      data: data,
      message: 'User Created'
    }
  }


  async remove(id) {
    let data = this.userModel.destroy({
      where: {
        id: id
      }
    });
    return {
      status: HttpStatus.CREATED,
      data: data,
      message: 'User Created'
    }
  }


}

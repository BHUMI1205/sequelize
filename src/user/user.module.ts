import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from '../models/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([users]), JwtModule.register({})],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule { }

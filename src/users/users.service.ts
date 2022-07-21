import { Injectable } from '@nestjs/common';
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userRepository: typeof User
    ) {}

    async createUser(dto: CreateUserDto) {
        return await this.userRepository.create(dto);
    }

    async getAllUsers() {
        return await this.userRepository.findAll({include: {all: true}});
    }

    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({where: {email}})
        return user;
    }
}

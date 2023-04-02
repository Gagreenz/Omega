import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import { User } from "./user.entity";
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async create(user:User): Promise<User> {
        return this.userRepository.save(user);
    }

    async findById(id:number): Promise<User> {
        //ищем пользователя по id
        return this.userRepository.findOne({ where: { id }, relations: ['profile'] });
    }

    async findByUsername(username:string): Promise<User> {
        //ищем пользователя по имени
        return this.userRepository.findOne({where: {username}});
    }

    comparePasswords(enteredPassword :string,hashedPassword:string): boolean{
        //Опять таки если не будет лень то тут будут хеши
        //К сожалению пока имеем только строки :( 
        const enteredPasswordBuffer = Buffer.from(enteredPassword);
        const hashedPasswordBuffer = Buffer.from(hashedPassword);
        //Это на десерт
        //const hashedPasswordBuffer = Buffer.from(hashedPassword, 'base64');
        const result = crypto.timingSafeEqual(enteredPasswordBuffer, hashedPasswordBuffer);
        return result;
    }
}
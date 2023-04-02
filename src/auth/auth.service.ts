import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { RegisterUserDto } from 'src/user/dto/registerUser.dto';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ProfileService } from 'src/profile/profile.service';
import { CreateProfileDto } from 'src/profile/dto/createProfile.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private profileService: ProfileService
    ) {}

    async register(userDto: RegisterUserDto): Promise<User>{
        //Ищем пользователя
        const existedUser = await this.userService.findByUsername(userDto.username);
        //Если пользователь уже есть то мы ничего не делаем
        if(existedUser){
            return null;
        } else {
            //Если все оки то возвращаем пользователя 
            //Иначе null
            //Не думаю что есть смысл возвращать токен в регистрации
            let user = User.fromRegisterUserDto(userDto);
            user = await this.userService.create(user);
            //Генерируем базовый профиль
            const profileDto: CreateProfileDto = {
                name: userDto.username,
                phone: userDto.phone,
                userId: user.id,
            };
            this.profileService.create(profileDto);

            return user;
        }
    }

    async login(userDto: LoginUserDto): Promise<object>{
        //Банально вернем null если не нашли совпадения
        if(await this.validateUser(userDto.username,userDto.password) === false) 
            return null;
        const user = await this.userService.findByUsername(userDto.username);
        //Формируем payload
        const payload = {
            id: user.id,
            role: user.role,
        } 
        const result = {
            //Генерируем сам токен
            access_token: this.jwtService.sign(payload),
            //Тут могла бы быть ваша реклама))
            //Шучу тут можно что нибудь еще добавить
        }
        console.log(result)
        return result;
    }

    async validateUser(username:string,password:string): Promise<boolean> {
        //Ищем пользователя
        const user = await this.userService.findByUsername(username);
        //Проверяем нашли липользователя
        if(!user) return false;
        //Сравниваем хеш пароля(если мне не лень будет)
        //Или просто сравниваем пароли :p
        return await this.userService.comparePasswords(password.toString(), user.password.toString());
    }

    
}
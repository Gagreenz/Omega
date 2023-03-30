import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async register(user: User): Promise<User>{
        //Ищем пользователя
        const existedUser = await this.userService.findByUsername(user.username);
        //Если пользователь уже есть то мы ничего не делаем
        if(existedUser){
            return null;
        } else {
            //Если все оки то возвращаем пользователя 
            //Иначе null
            //Не думаю что есть смысл возвращать токен в регистрации
            return await this.userService.create(user);
        }
    }

    async login(user: any): Promise<object>{
        //Банально вернем null если не нашли совпадения
        if(await this.validateUser(user.username,user.password) === false) 
            return null;
        //Пакуем все в payload чтобы получить токен
        const payload = { username: user.username, password: user.password};
        //Формируем результат(токен и прочее)
        const result = {
            //Генерируем сам токен
            access_token: this.jwtService.sign(payload),
            //Тут могла бы быть ваша реклама))
            //Шучу тут можно что нибудь еще добавить
        }
        return result;
    }

    async validateUser(username:string,password:string): Promise<boolean> {
        //Ищем пользователя
        const user = await this.userService.findByUsername(username);
        //Проверяем нашли липользователя
        if(!user) return false;
        //Сравниваем хеш пароля(если мне не лень будет)
        //Или просто сравниваем пароли :p
        return await this.userService.comparePasswords(password, user.password);
    }

    
}
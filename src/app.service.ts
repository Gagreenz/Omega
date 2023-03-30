import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Типа базовый маршрут, друг тебе бы на другой перейти, там интереснее';
    }
}
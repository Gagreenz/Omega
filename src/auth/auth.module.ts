import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity'; 

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions:{
                expiresIn: '1h'
            },
        }),
        UserModule,
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService,UserService],
    exports: [AuthService],
})

export class AuthModule {}
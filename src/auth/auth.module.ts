import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity'; 
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/profile.entity';
import { config } from 'dotenv';

config();
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions:{
                expiresIn: '1h'
            },
        }),
        UserModule,
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Profile])
    ],
    controllers: [AuthController],
    providers: [AuthService,UserService,ProfileService],
    exports: [AuthService],
})

export class AuthModule {}
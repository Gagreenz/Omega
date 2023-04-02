import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/db/database.module';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { JwtStrategy } from 'src/auth/strategies/jwtStrategy';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Profile]),
        TypeOrmModule.forFeature([User])
    ],
    providers: [
        UserService,
        ProfileService,
        JwtStrategy
    ],
    exports: [
        UserService,
        ProfileService
    ]
})

export class ProfileModule {}

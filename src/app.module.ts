import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwtStrategy';
import { TextBlockModule } from './textblock/textblock.module';
import { TextBlockController } from './textblock/textblock.controller';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { RolesGuard } from './auth/strategies/authGuard';
import { FileModule } from './file/file.module';
import { FileController } from './file/file.controller';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        AuthModule,
        ProfileModule,
        TextBlockModule,
        FileModule,
        Reflector
    ],
    controllers: [
        AppController,
        ProfileController,
        TextBlockController,
        FileController,
    ],
    providers: [
        AppService,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    exports: [
        JwtStrategy
    ]
})

export class AppModule {}
import { Body, Controller, Get, Post } from "@nestjs/common/decorators";
import { RegisterUserDto } from "src/user/dto/registerUser.dto";
import { LoginUserDto } from "src/user/dto/loginUser.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly AuthService : AuthService) {}

    @Post("register")
    register(@Body() userData: RegisterUserDto): void {
        this.AuthService.register(userData)
    }

    @Post("login")
    login(@Body() userData: LoginUserDto): Promise<any> {
        return this.AuthService.login(userData)
    }
}
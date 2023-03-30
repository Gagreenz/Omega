import { Body, Controller, Get, Post } from "@nestjs/common/decorators";
import { User } from "src/user/user.entity";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    constructor(private readonly AuthService : AuthService) {}

    @Post("register")
    register(@Body() userData: { username: string, password: string }) {
        const user: User = { id:1,username: userData.username, password: userData.password,role:"Admin" };
        this.AuthService.register(user)
    }
    
}
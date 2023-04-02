import { Body, Controller, Get, Put, Headers, Delete, Query, UseGuards, Req  } from "@nestjs/common";
import { UpdateProfileDto } from "./dto/updateProfile.dto";
import { ProfileService } from "./profile.service";
import { DeleteResult } from "typeorm";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Controller("profiles")
export class ProfileController {
    constructor(
        private readonly ProfileService: ProfileService,
        private readonly UserService: UserService
    ) {}

    @Get("getById")
    getById(@Headers() header){
        const id = header.id;
        return this.ProfileService.getById(id);
    }

    
    @Delete('delete')
    @UseGuards(AuthGuard(`jwt`))
    async delete(@Query('id') id: number, @Req() req: Request): Promise<DeleteResult|string> {
        var user = req['user'];
        console.log(user)
        return await this.ProfileService.delete(id,user);
    }

    
    @Put("update")
    @UseGuards(AuthGuard(`jwt`))
    update(@Body() updateProfileDto : UpdateProfileDto){
        this.ProfileService.update(updateProfileDto);
    }

}
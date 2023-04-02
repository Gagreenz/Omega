import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Profile } from "./profile.entity";
import { CreateProfileDto } from "./dto/createProfile.dto";
import { UserService } from "src/user/user.service";
import { UpdateProfileDto } from "./dto/updateProfile.dto";
import { User } from "src/user/user.entity";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly ProfileRepository: Repository<Profile>,
        private readonly UserService: UserService,
    ) {}

    async create(profileDto: CreateProfileDto): Promise<Profile> {
        const user = await this.UserService.findById(profileDto.userId);
        const profile = Profile.fromCreateProfileDto(profileDto, user);
        return this.ProfileRepository.save(profile);
    }

    async getById(id: number): Promise<Profile> {
        return await this.ProfileRepository.findOne({where: {id}});
    }

    async delete(id: number,user: User): Promise<DeleteResult | string> {
        if(user.role !== "admin"){
            if(user.profile.id != id) 
                return "Access denied";
        }
        return await this.ProfileRepository.delete(id);
    }

    async update(profileDto: UpdateProfileDto): Promise<Profile> {
        const profile = await this.ProfileRepository.findOne({ where: { id: profileDto.id } });
        if (!profile) {
          throw new NotFoundException('Profile not found');
        }
      
        profile.name = profileDto.name;
        profile.phone = profileDto.phone;
      
        return await this.ProfileRepository.save(profile);
    }

}
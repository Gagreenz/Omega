import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm"
import { RegisterUserDto } from "./dto/registerUser.dto";
import { Profile } from "src/profile/profile.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;
  
    @Column()
    password: string;
  
    @Column()
    role: string;

    @OneToOne(() => 
        Profile, profile => 
            profile.user,
            { 
                cascade: true,
                 onDelete: 'CASCADE' 
            }
    )
    @JoinColumn()
    profile: Profile;

    static fromRegisterUserDto(registerUserDto: RegisterUserDto): User {
        const user = new User();
        user.username = registerUserDto.username;
        user.password = registerUserDto.password;
        user.role = "user";
    
        return user;
    }
}
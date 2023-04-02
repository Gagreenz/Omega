import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateProfileDto } from './dto/createProfile.dto';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @OneToOne(() => User, user => user.profile)
  user: User;

    static fromCreateProfileDto(createProfileDto: CreateProfileDto, user: User): Profile {
        const profile = new Profile();

        profile.name = createProfileDto.name;
        profile.phone = createProfileDto.phone;
        // Здесь можно добавить логику для получения пользователя из БД по его id если будет криво работать
        profile.user = user;
        profile.user.id = user.id;

        return profile;
    }
}
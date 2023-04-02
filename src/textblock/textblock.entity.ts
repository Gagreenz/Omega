import { File } from 'src/file/file.entity';
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from 'typeorm';

@Entity()
export class TextBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @ManyToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'image_id' })
  image: File;

  @Column()
  text: string;

  @Column()
  group: string;
}
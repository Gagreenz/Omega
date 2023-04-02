import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  essenceTable: string;

  @Column({ nullable: true })
  essenceId: number;
}
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    nickname: string;
    @Column()
    profileImage: string;
    @Column()
    kakaoId: number;
    @Column()
    createdAt: Date;
    @Column()   
    updatedAt: Date;  
}

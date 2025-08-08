import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Index()
    id: string;
    
    @Column()
    @Index({ unique: true })
    email: string;

    @Column()
    password: string;
}
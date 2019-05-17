import {Entity, PrimaryGeneratedColumn, Column, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    isInstructor: boolean

    @Column()
    uid: string
}
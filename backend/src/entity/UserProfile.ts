import {Entity, PrimaryGeneratedColumn, Column, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class UserProfile {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isInstructor: boolean
}
import {Entity, PrimaryGeneratedColumn, Column, ObjectID, ObjectIdColumn} from "typeorm";
import { UserProfile } from "./UserProfile";

@Entity()
export class Course {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    school: string;

    @Column()
    term: string;

    @Column(type=>UserProfile)
    instructor: UserProfile;

    @Column()
    studentJoinSecret: string

    @Column()
    TAJoinSecret: string
}
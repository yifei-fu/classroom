import {Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { User } from './User';

@Entity()
export class UserProfile {

    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public username: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public email: string;

    @Column()
    public isInstructor: boolean;

    @Column()
    public enrolledCourses: ObjectID[];

    @Column()
    public uid: string;
}

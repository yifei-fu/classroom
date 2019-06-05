import {Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn} from 'typeorm';
import { UserProfile } from './UserProfile';

@Entity()
export class Course {

    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public name: string;

    @Column()
    public school: string;

    @Column()
    public term: string;

    @Column((type) => UserProfile)
    public instructor: UserProfile;

    @Column()
    public studentJoinSecret: string;

    @Column()
    public TAJoinSecret: string;

    @Column()
    public enrolledUsers: ObjectID[];
}

import {Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn} from 'typeorm';
import {UserProfile} from './UserProfile';
import {Quiz} from './Quiz';

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

    @Column()
    public studentJoinSecret: string;

    @Column()
    public TAJoinSecret: string;
    
    @Column((type) => UserProfile)
    public enrolledUsers: UserProfile[];

    @Column((type) => UserProfile)
    public instructors: UserProfile[];
}

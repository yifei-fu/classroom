import {Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn} from 'typeorm';

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
    public isInstructor: boolean;

    @Column()
    public enrolledCourses: ObjectID[];
}

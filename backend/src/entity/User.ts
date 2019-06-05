import {Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {

    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public email: string;

    @Column()
    public isInstructor: boolean;

    @Column()
    public uid: string;

    @Column()
    public enrolledCourses: ObjectID[]
}

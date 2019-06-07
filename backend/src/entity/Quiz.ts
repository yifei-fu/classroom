import {Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';
import {Question} from './Question'

@Entity()
export class Quiz {

    @ObjectIdColumn()
    public id: ObjectID;

    @ObjectIdColumn()
    public courseID: ObjectID;

    @Column()
    public name: string;

    @Column()
    public questions: ObjectID[];

    @Column()
    public startTime: string;

    @Column()
    public endTime: string;

    @Column()
    public openToRoles: string[]

    @Column()
    public resultVisibleToRoles: string[]

    @Column()
    public secret: string;
}

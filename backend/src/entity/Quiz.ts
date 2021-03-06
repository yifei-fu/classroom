import {Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';
import {Question} from './Question'

@Entity()
export class Quiz {

    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public courseID: string;

    @Column()
    public name: string;

    @Column((type) => Question)
    public questions: Question[];

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

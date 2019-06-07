import {Column, ObjectIdColumn, ObjectID, Entity} from 'typeorm';

@Entity()
export class Question {
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public title: string;

    @Column()
    public text: string;

    @Column()
    public responseType: string;

    @Column()
    public responseChoices: string[];
}


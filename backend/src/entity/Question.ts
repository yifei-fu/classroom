import {Column} from 'typeorm';

export class Question {
    
    @Column()
    public title: string;

    @Column()
    public text: string;

    @Column()
    public responseType: string;

    @Column()
    public responseChoices: string;
}

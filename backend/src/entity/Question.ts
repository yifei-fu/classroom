import {Column} from 'typeorm';

export class Question {
    @Column()
    public title: string;

    @Column()
    public text: string;

    @Column()
    public responseType: string;

    @Column()
    public responseChoices: string[];

    constructor(title: string, text: string, responseType: string, responseChoices: string[]) {
        this.title = title;
        this.text = text;
        this.responseChoices = responseChoices;
        this.responseType = responseType;
    }
}


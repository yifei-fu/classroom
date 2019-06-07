import {Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';
import { UserProfile } from './UserProfile';

@Entity()
export class QuizResponse {

    @ObjectIdColumn()
    public id: ObjectID;

    @ObjectIdColumn()
    public quizId: ObjectID;

    @Column((type) => UserProfile)
    public user: UserProfile;

    @Column()
    public responses: string;
}

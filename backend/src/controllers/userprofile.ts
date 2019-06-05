import {getMongoManager} from 'typeorm';
import {UserProfile} from '../entity/UserProfile';
import {User} from '../entity/User';

// UserProfile Controller Class
export class UserProfileController {
    public static getUserProfiles(req, res) {
        getMongoManager().find(UserProfile)
        .then((profiles) => {
            console.log(profiles);
            return res.json(profiles);
        });
    }

    public static async createUserProfile(user) {
        const userProfile: UserProfile = await getMongoManager()
        .create(UserProfile,
        {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isInstructor: user.isInstructor,
            enrolledCourses: user.enrolledCourses,
            uid: user.uid
        });
        const result =  await getMongoManager().insertOne(UserProfile, userProfile)
        return result
    }
}

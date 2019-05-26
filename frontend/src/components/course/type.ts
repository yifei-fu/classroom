import {RouteComponentProps} from 'react-router';
import {CourseDetails} from '../../api/type';

export interface CourseComponentProps extends RouteComponentProps {
  courseDetails: CourseDetails;
}

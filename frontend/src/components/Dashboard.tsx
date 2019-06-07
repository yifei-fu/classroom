import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { History } from 'history';
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, ListGroup, Row} from 'react-bootstrap';
import {RouteComponentProps, withRouter } from 'react-router';
import APIManager from '../api/APIManager';
import {Course} from '../api/type';
import '../common.css';
import Avatar from './Avatar';
import CardContainer from './CardContainer';
import CreateCourseModal from './CreateCourseModal';
import './Dashboard.css';

function renderCourse(history: History, course: Course, index: number): React.ReactNode {
    return (
      <ListGroup.Item
        action
        className='course'
        onClick={() => history.push(`/course/${course.id}`)}>
          <Avatar text={(course.name.match(/^[a-zA-Z]+/) || [course.name])[0]}/>
            <div className='course-text'>
              <h5>{course.name}</h5>
              <div>{course.school} {course.term} by {course.instructor.firstName} {course.instructor.lastName}</div>
            </div>
      </ListGroup.Item>
    );
}

interface Props extends RouteComponentProps {
}

const Dashboard: React.FC<Props> = (props: Props) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [createCourseModalOpen, setCreateCourseModalOpen] = useState<boolean>(false);
    const {history} = props;
    useEffect(() => {
        APIManager.getEnrolledCourses().then((data) => {
            setCourses(data);
        });
    }, []);
    return (
        <div className='dashboard main-content'>
          <CreateCourseModal
            open={createCourseModalOpen}
            setOpen={setCreateCourseModalOpen}
          />
          <h1 className='display-4'>Dashboard</h1>
          <CardContainer title='Courses'>
            <ListGroup variant='flush'>
              {courses.map((course, idx) => renderCourse(history, course, idx))}
            </ListGroup>
          </CardContainer>
          <Button
            className='mt-3 ml-auto mr-auto button primary-gradient shadow'
            onClick={() => setCreateCourseModalOpen(true)}
          >
            <FontAwesomeIcon icon='plus' color='white' className='ml-1 mr-2' />
            Create a New Course
          </Button>
        </div>
    );
};

export default withRouter(Dashboard);

import { History } from 'history';
import React, {useEffect, useState} from 'react';
import {Card, Col, Container, ListGroup, Row} from 'react-bootstrap';
import {RouteComponentProps, withRouter } from 'react-router';
import APIManager from '../api/APIManager';
import {Course} from '../api/type';
import CardContainer from './CardContainer';
import './Dashboard.css';

function renderCourse(history: History, course: Course, index: number): React.ReactNode {
    return (
      <ListGroup.Item
        action
        className='course'
        onClick={() => history.push(`/course/${course.id}`)}>
        <Card.Text>
          {course.name}
          <br/>
          School: {course.school}
          <br/>
          Term: {course.term}
          <br/>
          Instructor: {course.instructor.firstName} {course.instructor.lastName}
        </Card.Text>
      </ListGroup.Item>
    );
}

interface Props extends RouteComponentProps {
}

const Dashboard: React.FC<Props> = (props: Props) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const {history} = props;
    useEffect(() => {
        APIManager.getEnrolledCourses().then((data) => {
            setCourses(data);
        });
    }, []);
    return (
        <div className='dashboard'>
            <h1 className='display-4'>Dashboard</h1>
            <Container fluid>
                <Row>
                    <Col xs={12} md={6} lg={4}>
                        <CardContainer title='Courses'>
                            <ListGroup variant='flush'>
                                {courses.map((course, idx) => renderCourse(history, course, idx))}
                            </ListGroup>
                        </CardContainer>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <CardContainer title='Upcoming Quizzes'>
                            <div className='courses-container'>
                                List of Quiz
                            </div>
                        </CardContainer>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <CardContainer title='Recent Discussion'>
                            <div className='courses-container'>
                                List of Post
                            </div>
                        </CardContainer>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withRouter(Dashboard);

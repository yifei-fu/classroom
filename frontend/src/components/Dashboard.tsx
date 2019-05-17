import React, {useEffect, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import APIManager from '../api/APIManager';
import {Course, CourseInfo} from '../api/type';

import './Dashboard.css';

function renderCourseCard(course: Course, index: number): React.ReactNode {
    return (
        <Card className='course-card shadow-sm p-3 mb-5 bg-white rounded' key={index}>
            <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>
                    School: {course.school}
                    <br/>
                    Term: {course.term}
                    <br/>
                    Instructor: {course.instructor.firstName} {course.instructor.lastName}
                </Card.Text>
                <Button variant='primary'>Enter</Button>
            </Card.Body>
        </Card>
    );
}

const Dashboard: React.FC = () => {
    const [coursesInfo, setCoursesInfo] = useState<Course[]>([]);
    useEffect(() => {
        APIManager.getEnrolledCoursesInfo().then((data) => {
            setCoursesInfo(data);
        });
    }, []);
    console.log(coursesInfo);
    return (
        <div className='dashboard'>
            <h1 className='display-4'>Dashboard</h1>
            <div className='shadow p-3 mb-5 bg-white rounded'>
                <h3>Courses</h3>
                <div className='courses-container'>
                    {coursesInfo.map(renderCourseCard)}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

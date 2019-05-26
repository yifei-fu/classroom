import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Col, Container, ListGroup, Row} from 'react-bootstrap';
import {CourseDetails, Quiz} from '../../api/type';
import CardContainer from '../CardContainer';
import Avatar from '../Dashboard';

export interface Props {
  courseDetails: CourseDetails;
}

export type QuizTime = 'past' | 'current' | 'upcoming';

function renderQuizItem(quiz: Quiz, idx: number): React.ReactNode {
  return (
    <ListGroup.Item
      action
      className='quiz'
    >
      <div className='text-left font-weight-normal'>
        <h5 className='font-weight-normal'>{quiz.name}</h5>
        <span className='mr-5 text-secondary'>
          <FontAwesomeIcon className='mr-2' icon='clock'/>
          {moment(quiz.startTime).calendar()}
        </span>
        <span className='text-secondary'>
          <FontAwesomeIcon className='mr-2' icon='hourglass'/>
          {moment(quiz.endTime).subtract(quiz.startTime).minutes()} minutes
        </span>
      </div>
    </ListGroup.Item>
  );
}

function quizTime(quiz: Quiz): QuizTime {
  const now = new Date();
  if (new Date(quiz.startTime) < now) {
    return 'past';
  }
  if (now < new Date(quiz.endTime)) {
    return 'current';
  }
  return 'upcoming';
}

const QuizView: React.FC<Props> = (props: Props) => {
  const {quizzes} = props.courseDetails;
  return (
    <div className='dashboard'>
      <Container fluid>
        <Row>
          {Array<QuizTime>('past', 'current', 'upcoming').map((time: QuizTime, idx: number) => (
            <Col key={idx} xs={12} md={6} lg={4}>
              <CardContainer title={time.charAt(0).toUpperCase() + time.slice(1)}>
                <ListGroup variant='flush'>
                  {quizzes.filter((quiz) => quizTime(quiz) === time).map((quiz, idx) => renderQuizItem(quiz, idx))}
                </ListGroup>
              </CardContainer>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default QuizView;

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Col, Container, ListGroup, Row} from 'react-bootstrap';
import {CourseDetails, Quiz} from '../../api/type';
import CardContainer from '../CardContainer';
import {QuizTime, quizTime} from '../utils';
import {CourseComponentProps} from './type';

export interface Props extends CourseComponentProps {
}

function renderQuizItem(props: Props, quiz: Quiz, idx: number): React.ReactNode {
  return (
    <ListGroup.Item
      key={idx}
      action
      className='quiz'
      onClick={() => props.history.push(`/course/${props.courseDetails.id}/quiz/${quiz.id}`)}
    >
      <div className='text-left font-weight-normal'>
        <h5 className='font-weight-normal'>{quiz.name}</h5>
        <span className='mr-5 text-secondary'>
          <FontAwesomeIcon className='mr-2' icon={['far', 'clock']}/>
          {moment(quiz.startTime).calendar()}
        </span>
        <span className='text-secondary'>
          <FontAwesomeIcon className='mr-2' icon={['far', 'hourglass']}/>
          {moment(quiz.endTime).diff(moment(quiz.startTime))} minutes
        </span>
      </div>
    </ListGroup.Item>
  );
}

const QuizListView: React.FC<Props> = (props: Props) => {
  const {quizzes} = props.courseDetails;
  return (
    <div className='dashboard'>
      <Container fluid>
        <Row>
          {Array<QuizTime>('past', 'current', 'upcoming').map((time: QuizTime, idx: number) => (
            <Col key={idx} xs={12} md={6} lg={4}>
              <CardContainer title={time.charAt(0).toUpperCase() + time.slice(1)}>
                <ListGroup variant='flush'>
                  {quizzes.filter((quiz) => quizTime(quiz) === time).map((quiz, idx) => renderQuizItem(props, quiz, idx))}
                </ListGroup>
              </CardContainer>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default QuizListView;

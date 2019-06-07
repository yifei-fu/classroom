import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {CourseDetails, Post} from '../../api/type';

export interface Props {
  courseDetails: CourseDetails;
}

function renderStat(name: string, namePlural: string, value: string | number) {
  const displayName = (typeof value === 'number' && value > 1) ? namePlural : name;
  return (
    <Col sm={4} md={3} xl={2}>
      <div className='ml-auto mr-auto mt-3 mb-3 primary-gradient shadow-lg text-center rounded20 p-2 stat'>
        <h1 className='font-weight-normal text-white'>{value}</h1>
        <h6 className='font-weight-normal text-white'>{displayName}</h6>
      </div>
    </Col>
  );
}

const CourseOverview: React.FC<Props> = (props: Props) => {
  const {courseDetails: {enrolledUsers, posts, quizzes, studentJoinSecret, TAJoinSecret}} = props;
  console.log(enrolledUsers);
  return (
      <Container fluid>
        <Row className='justify-content-md-center'>
            {renderStat('User', 'Users', enrolledUsers.length)}
            {renderStat('Post', 'Posts', posts.length)}
            {renderStat('Quiz', 'Quizzes', quizzes.length)}
          {
            studentJoinSecret && (
              renderStat('Student Join Secret', 'Student Join Secret', studentJoinSecret)
            )
          }
          {
            TAJoinSecret && (
              renderStat('TA Join Secret', 'TA Join Secret', TAJoinSecret)
            )
          }
        </Row>
        <Row>
          <ReactTable
            data={enrolledUsers}
            className='rounded20 ml-auto mr-auto mt-2'
            columns={[
              {
                Header: 'Username',
                accessor: 'username',
              },
              {
                  id: 'name',
                Header: 'Name',
                accessor: (item) => `${item.firstName} ${item.lastName}`,
              },
              {
                Header: 'UID',
                accessor: 'uid',
              },
              {
                Header: 'Role',
                accessor: 'role',
              },
            ]}
          />
        </Row>
      </Container>
  );
};

export default CourseOverview;

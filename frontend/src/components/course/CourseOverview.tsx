import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {toast} from 'react-toastify';
import {CourseDetails, Post} from '../../api/type';

export interface Props {
  courseDetails: CourseDetails;
}

function renderStat(name: string, namePlural: string, value: string | number, onClick?: () => void) {
  const displayName = (typeof value === 'number' && value > 1) ? namePlural : name;
  return (
    <Col sm={4} md={3} xl={2}>
      <div
        className='ml-auto mr-auto mt-3 mb-3 primary-gradient shadow-lg text-center rounded20 p-2 stat'
        onClick={onClick}
      >
        <h1 className='font-weight-light text-white'>{value}</h1>
        <h6 className='font-weight-normal text-white'>{displayName}</h6>
      </div>
    </Col>
  );
}

const CourseOverview: React.FC<Props> = (props: Props) => {
  const {courseDetails: {description, enrolledUsers, posts, quizzes, studentJoinSecret, TAJoinSecret}} = props;
  console.log(enrolledUsers);
  return (
      <Container fluid>
        <Row className='justify-content-md-center'>
          <Col>
            <p className='mt-2'>{description}</p>
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          {renderStat('User', 'Users', enrolledUsers ? enrolledUsers.length : 0)}
            {renderStat('Post', 'Posts', posts ? posts.length : 0)}
            {renderStat('Quiz', 'Quizzes', quizzes ? quizzes.length : 0)}
          {
            studentJoinSecret && (
              renderStat('Student Join Secret', 'Student Join Secret', studentJoinSecret, () => {
                toast.info('Copied invite link to clipboard.');
              })
            )
          }
          {
            TAJoinSecret && (
              renderStat('TA Join Secret', 'TA Join Secret', TAJoinSecret, () => {
                toast.info('Copied invite link to clipboard.');
              })
            )
          }
        </Row>
        <h2 className='font-weight-normal'>Users</h2>
        <Row>
          <Col>
            <ReactTable
              data={enrolledUsers}
              className='rounded20 ml-auto mr-auto mt-2 w-75'
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
                  Header: 'Email',
                  accessor: 'email',
                },
                {
                  Header: 'Role',
                  accessor: 'role',
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
  );
};

export default CourseOverview;

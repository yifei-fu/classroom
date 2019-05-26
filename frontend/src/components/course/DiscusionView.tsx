import React, {useEffect, useState} from 'react';
import {CourseDetails, Post} from '../../api/type';

import {Col, Container, ListGroup, Row} from 'react-bootstrap';
import '../../common.css';
import PostCard from './PostCard';

export interface Props {
  courseDetails: CourseDetails;
}

const DiscussionView: React.FC<Props> = (props: Props) => {
  const {courseDetails: {posts}} = props;
  return (
    <div>
      <Container fluid>
        <Row>
          {posts.map((post: Post, idx: number) => (
            <Col md={12} lg={6} xl={4}>
              <PostCard key={idx} post={post} />
            </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default DiscussionView;

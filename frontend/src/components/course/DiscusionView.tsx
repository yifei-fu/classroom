import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, ListGroup, Row} from 'react-bootstrap';
import {CourseDetails, Post} from '../../api/type';

import '../../common.css';
import CreatePostModal from './CreatePostModal';
import PostCard from './PostCard';

export interface Props {
  courseDetails: CourseDetails;
}

const DiscussionView: React.FC<Props> = (props: Props) => {
  const [createPostModalOpen, setCreatePostModalOpen] = useState<boolean>(false);
  const {courseDetails: {posts}} = props;

  return (
    <div>
      <CreatePostModal
        open={createPostModalOpen}
        setOpen={setCreatePostModalOpen}
        courseID={props.courseDetails.id}
      />
      <Container fluid>
        <Row>
          {posts.map((post: Post, idx: number) => (
            <Col md={12} lg={6} xl={4}>
              <PostCard key={idx} courseID={props.courseDetails.id} post={post} />
            </Col>
            ))}
        </Row>
        <Row>
          <Button
            className='mt-3 ml-auto mr-auto button primary-gradient shadow'
            onClick={() => setCreatePostModalOpen(true)}
          >
            <FontAwesomeIcon icon='plus' color='white' className='ml-1 mr-2' />
            Add a post
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default DiscussionView;

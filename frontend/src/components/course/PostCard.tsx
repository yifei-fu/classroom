import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Button, Card, ListGroup} from 'react-bootstrap';
import {Post} from '../../api/type';
import UserDisplay from '../utils/UserDisplay';

import '../CardContainer.css';
import './PostCard.css';

export interface Props {
  post: Post;
}

function renderComments(post: Post) {
  return (
    <ListGroup>
      {post.comments.map((comment, idx) => (
        <div
          key={idx}
          className='p-2 mb-2 shadow-sm post-comment'
        >
          <div className='post-comment-text'>
            <div>
              <span className='mr-5 text-secondary'>
                <FontAwesomeIcon className='mr-2' icon='clock'/>
                {moment(comment.creationTime).fromNow()}
              </span>
              <span className='text-secondary'>
                <FontAwesomeIcon className='mr-2' icon='user'/>
                <UserDisplay user={comment.author}/>
              </span>
            </div>
            <div>{comment.content}</div>
          </div>
        </div>
      ))}
      <Button className='mt-3 ml-auto mr-auto button primary-gradient'>
        <FontAwesomeIcon icon='plus' color='white' className='ml-1 mr-1' /> Add a comment
      </Button>
    </ListGroup>
  );
}

const PostCard: React.FC<Props> = (props: Props) => {
  const {post} = props;
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
      <Card className={'card-container post-card mb-4 shadow' + (expanded ? ' expanded' : '')}>
        <Card.Body className='post-body'>
          <Card.Title>
            {post.title}
          </Card.Title>
          <Card.Text>
            {post.content}
          </Card.Text>
          {
            expanded && renderComments(post)
          }
        </Card.Body>
        <Card.Footer className='bg-white border-0 text-secondary post-footer'>
          <span>
            <FontAwesomeIcon className='mr-2' icon='tags'/>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className='badge badge-pill badge-primary primary-gradient font-weight-normal mr-1'>{tag}</span>
            ))}
          </span>
          <span>
          <FontAwesomeIcon className='mr-2' icon='clock'/>
          {moment(post.creationTime).fromNow()}
          </span>
          <span>
            <FontAwesomeIcon className='mr-2' icon='user'/>
            <UserDisplay user={post.author}/>
          </span>
        </Card.Footer>
        <Card.Footer className='bg-white p-2' onClick={() => setExpanded((prevState) => !prevState)}>
          <FontAwesomeIcon icon={expanded ? 'chevron-up' : 'chevron-down'}/>
        </Card.Footer>
      </Card>
  );
};

export default PostCard;

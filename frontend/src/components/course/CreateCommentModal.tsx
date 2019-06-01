import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {Button, Col, Form, ListGroup, Modal, Row} from 'react-bootstrap';

import {toast} from 'react-toastify';
import APIManager from '../../api/APIManager';
import {CreateCommentRequestBody} from '../../api/type';
import '../../common.css';
import './modal.css';

export interface Props {
  courseID: string;
  postID: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateCommentModal: React.FC<Props> = (props: Props) => {
  const [formData, setFormData] = useState<CreateCommentRequestBody>({content: ''});
  const {courseID, postID, open, setOpen} = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setFormData({content: value});
  };

  const handleSubmit = () => {
    APIManager.createComment(courseID, postID, formData).then(() => {
      toast.success('Comment created successfully.');
      setOpen(false);
    }).catch(() => {
      toast.error('Failed to create comment. Please try again later.');
    });
  };

  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      show={open}
      onHide={() => setOpen(false)}
      centered
    >
      <Modal.Header className='border-0 pb-0' closeButton>
        <h5 className='font-weight-normal'>Add a new comment</h5>
      </Modal.Header>
      <Modal.Body className='pl-3 pr-3'>
        <Form>
          <Row>
            <Col>
              <textarea
                rows={3}
                className='form-control text-field shadow-sm'
                id='comment-content'
                aria-describedby='content'
                placeholder='Content'
                value={formData.content}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form>
        <Button
          onClick={handleSubmit}
          className='mt-3 ml-auto mr-auto button primary-gradient shadow'
        >
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCommentModal;

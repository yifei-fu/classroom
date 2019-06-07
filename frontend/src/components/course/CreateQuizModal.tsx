import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {Button, Col, Form, ListGroup, Modal, Row} from 'react-bootstrap';

import {toast} from 'react-toastify';
import APIManager from '../../api/APIManager';
import {CreatePostRequestBody} from '../../api/type';
import '../../common.css';
import './modal.css';

export interface Props {
  courseID: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateQuizModal: React.FC<Props> = (props: Props) => {
  const [formData, setFormData] = useState<CreatePostRequestBody>({title: '', tags: [], content: ''});
  const {courseID, open, setOpen} = props;

  const handleChange = (field: 'title' | 'content') => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setFormData((prevState: CreatePostRequestBody) => ({...prevState, [field]: value}));
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tags = Array.from(new Set(event.target.value.split(',').map((tag) => tag.trim())));
    setFormData((prevState: CreatePostRequestBody) => ({...prevState, tags}));
  };

  const handleSubmit = () => {
    APIManager.createPost(courseID, formData).then(() => {
      toast.success('Post created successfully.');
      setOpen(false);
    }).catch(() => {
      toast.error('Failed to create post. Please try again later.');
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
        <h5 className='font-weight-normal'>Create a new quiz</h5>
      </Modal.Header>
      <Modal.Body className='pl-3 pr-3'>
        <Form>
          <Row>
            <Col>
              <input
                type='text'
                className='form-control text-field shadow-sm'
                id='post-title'
                aria-describedby='title'
                placeholder='Title'
                value={formData.title}
                onChange={handleChange('title')}
              />
            </Col>
            <Col>
              <input
                type='text'
                className='form-control text-field shadow-sm'
                id='post-title'
                aria-describedby='tags'
                placeholder='Tags'
                value={formData.tags}
                onChange={handleTagsChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <textarea
                rows={3}
                className='form-control text-field shadow-sm'
                id='post-content'
                aria-describedby='content'
                placeholder='Content'
                value={formData.content}
                onChange={handleChange('content')}
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

export default CreateQuizModal;

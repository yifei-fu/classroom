import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {Button, Col, Form, ListGroup, Modal, Row} from 'react-bootstrap';
import {Question} from '../../api/type';

import {toast} from 'react-toastify';
import APIManager from '../../api/APIManager';
import {CreateQuizRequestBody} from '../../api/type';
import CardContainer from '../CardContainer';
import '../../common.css';
import './modal.css';

export interface Props {
  courseID: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateQuizModal: React.FC<Props> = (props: Props) => {
  const [formData, setFormData] = useState<CreateQuizRequestBody>({title: '', content: '', answer: '', title1: '', content1: '', answer1: '', title2: '', content2: '', answer2: '', title3: '', content3: '', answer3: '', tags: []});
  //const [formData, setFormData] = useState<CreateQuizRequestBody>({title: '', content: '', tags: [], answer: '', title1: ''});
  const {courseID, open, setOpen} = props;

  const handleChange = (field: 'title1' | 'content1' | 'answer1' | 'title2' | 'content2' | 'answer2' | 'title3' | 'content3' | 'answer3') => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setFormData((prevState: CreateQuizRequestBody) => ({...prevState, [field]: value}));
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tags = Array.from(new Set(event.target.value.split(',').map((tag) => tag.trim())));
    setFormData((prevState: CreateQuizRequestBody) => ({...prevState, tags}));
  };

  const handleSubmit = () => {
    APIManager.createPost(courseID, formData).then(() => {
      toast.success('Quiz created successfully.');
      setOpen(false);
    }).catch(() => {
      toast.error('Failed to create quiz. Please try again later.');
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
      <CardContainer>
        <Form>
          
            <Row>
              <Col>
                <input
                  type='text'
                  className='form-control text-field shadow-sm'
                  id='post-title'
                  aria-describedby='title'
                  placeholder='Title for question 1'
                  value={formData.title1}
                  onChange={handleChange('title1')}
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
                  placeholder='Question for question 1'
                  value={formData.content1}
                  onChange={handleChange('content1')}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <textarea
                  rows={3}
                  className='form-control text-field shadow-sm'
                  id='post-answer'
                  aria-describedby='answer'
                  placeholder='Answer for question 1'
                  value={formData.answer1}
                  onChange={handleChange('answer1')}
                />
              </Col>
            </Row>
            
          
        </Form>
        </CardContainer>


        <Form>
        <CardContainer>
          <Row>
            <Col>
              <input
                type='text'
                className='form-control text-field shadow-sm'
                id='post-title'
                aria-describedby='title'
                placeholder='Title for question 2'
                value={formData.title2}
                onChange={handleChange('title2')}
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
                placeholder='Question for question 2'
                value={formData.content2}
                onChange={handleChange('content2')}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <textarea
                rows={3}
                className='form-control text-field shadow-sm'
                id='post-answer'
                aria-describedby='answer'
                placeholder='Answer for question 2'
                value={formData.answer2}
                onChange={handleChange('answer2')}
              />
            </Col>
          </Row>
          </CardContainer>
        </Form>

        <Form>
        <CardContainer>
          <Row>
            <Col>
              <input
                type='text'
                className='form-control text-field shadow-sm'
                id='post-title'
                aria-describedby='title'
                placeholder='Title for question 3'
                value={formData.title3}
                onChange={handleChange('title3')}
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
                placeholder='Question for question 3'
                value={formData.content3}
                onChange={handleChange('content3')}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <textarea
                rows={3}
                className='form-control text-field shadow-sm'
                id='post-answer'
                aria-describedby='answer'
                placeholder='Answer for question 3'
                value={formData.answer3}
                onChange={handleChange('answer3')}
              />
            </Col>
          </Row>
          </CardContainer>
        </Form>


        <Button
          onClick={handleSubmit}
          className='mt-3 ml-auto mr-auto button primary-gradient shadow'
        >
          Create post
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default CreateQuizModal;

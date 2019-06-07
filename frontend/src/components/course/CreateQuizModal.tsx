import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {Button, Col, Form, ListGroup, Modal, Row} from 'react-bootstrap';
import {Question} from '../../api/type';

import {toast} from 'react-toastify';
import APIManager from '../../api/APIManager';
import {CreateQuizRequestBody} from '../../api/type';
import '../../common.css';
import CardContainer from '../CardContainer';
import './modal.css';

export interface Props {
  courseID: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function renderQuestion(question: Question, setFormData: React.Dispatch<React.SetStateAction<CreateQuizRequestBody>>, idx: number) {
  const {title, text, responseType, responseChoices} = question;
  const handleChange = (field: 'title' | 'text' | 'responseType' | 'responseChoices') => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const newQuestion = {
      title,
      text,
      responseType,
      responseChoices,
      [field]: value,
    };
    console.log(newQuestion)
    setFormData((prevState) => {
      prevState.questions[idx] = newQuestion;
      return prevState;
    });
  };
  const choices = responseChoices ? responseChoices.join('\n') : '';
  return (
    <CardContainer key={idx}>
      <Form>
        <Row>
          <Col>
            <input
              type='text'
              className='form-control text-field shadow-sm'
              id='post-title'
              aria-describedby='title'
              placeholder='Title'
              value={title}
              onChange={handleChange('title')}
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
                  placeholder='Question'
                  value={text}
                  onChange={handleChange('text')}
                />
          </Col>
        </Row>
        <Row>
          <Col>
                <input
                  className='form-control text-field shadow-sm'
                  id='post-response-type'
                  aria-describedby='response-type'
                  placeholder='Response Type'
                  value={responseType}
                  onChange={handleChange('responseType')}
                />
          </Col>
        </Row>
        {
          responseType === 'choices' && (
            <Row>
              <Col>
                <textarea
                  rows={3}
                  className='form-control text-field shadow-sm'
                  id='post-response-choices'
                  aria-describedby='response-choices'
                  placeholder='Response Choices'
                  value={choices}
                  onChange={handleChange('responseChoices')}
                />
              </Col>
            </Row>
          )
        }
      </Form>
    </CardContainer>
  );
}

const CreateQuizModal: React.FC<Props> = (props: Props) => {
  const {courseID, open, setOpen} = props;

  const [formData, setFormData] = useState<CreateQuizRequestBody>({
    name: '',
    startTime: '',
    endTime: '',
    questions: [],
  });

  const addQuestion = () => {
    setFormData((prevState) => ({
      ...prevState,
      questions: prevState.questions.concat([{
        title: '',
        text: '',
        responseType: 'choices',
        responseChoices: [],
      }]),
    }));
  };

  const handleSubmit = () => {
    APIManager.createQuiz(courseID, formData).then(() => {
      toast.success('Quiz created successfully.');
      setOpen(false);
    }).catch(() => {
      toast.error('Failed to create quiz. Please try again later.');
    });
  };
  console.log(formData);
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
        {formData.questions.map((question, idx) => renderQuestion(question, setFormData, idx))}
        <Button
          className='mt-3 ml-auto mr-auto button primary-gradient shadow'
          onClick={addQuestion}
        >
          <FontAwesomeIcon icon='plus' color='white' />
        </Button>
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

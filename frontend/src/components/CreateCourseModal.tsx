import React, {useEffect, useState} from 'react';
import {Button, Col, Form, ListGroup, Modal, Row} from 'react-bootstrap';
import {toast} from 'react-toastify';
import '../common.css';
import APIManager from '../api/APIManager';
import {CreateCourseRequestBody} from '../api/type';
import './course/modal.css';

export interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateCourseModal: React.FC<Props> = (props: Props) => {
  const [formData, setFormData] = useState<CreateCourseRequestBody>({name: '', school: '', term: ''});
  const {open, setOpen} = props;

  const handleChange = (field: 'name' | 'school' | 'term') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData((prevState: CreateCourseRequestBody) => ({...prevState, [field]: value}));
  };

  const handleSubmit = () => {
    APIManager.createCourse(formData).then(() => {
      toast.success('Course created successfully.');
      setOpen(false);
    }).catch(() => {
      toast.error('Failed to create course. Please try again later.');
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
        <h5 className='font-weight-normal'>Add a new post</h5>
      </Modal.Header>
      <Modal.Body className='pl-3 pr-3'>
        <Form>
          <Row>
            <Col>
              <input
                type='text'
                className='form-control text-field shadow-sm'
                id='course-name'
                aria-describedby='name'
                placeholder='Course Name'
                value={formData.name}
                onChange={handleChange('name')}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type='text'
                className='form-control text-field shadow-sm'
                id='course-school'
                aria-describedby='school'
                placeholder='School'
                value={formData.school}
                onChange={handleChange('school')}
              />
            </Col>
            <Col>
              <input
                type='text'
                className='form-control text-field shadow-sm'
                id='course-term'
                aria-describedby='term'
                placeholder='Term'
                value={formData.term}
                onChange={handleChange('term')}
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

export default CreateCourseModal;

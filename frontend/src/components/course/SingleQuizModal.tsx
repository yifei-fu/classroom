import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';

import {RouteComponentProps} from 'react-router';
import {toast} from 'react-toastify';
import {Question, Quiz, QuizResponse} from '../../api/type';
import '../../common.css';
import {quizTime} from '../utils';
import './modal.css';
import QuestionCard from './QuestionCard';

export interface Props extends RouteComponentProps {
  courseID: string;
  quiz: Quiz;
}

export function initializeResponses(questions: Question[]): Array<string | number> {
  return questions.map((question) => {
    if (question.responseType === 'string' || question.responseType === 'number') {
      return '';
    } else { // choices
      return -1;
    }
  });
}

const handleResponseChange = (idx: number, setResponses: React.Dispatch<React.SetStateAction<Array<string | number>>>, allowSubmit: boolean) => (value: string | number): void => {
  if (allowSubmit) {
    setResponses((prevState) => ({...prevState, [idx]: value}));
  }
};

function renderQuestions(allowSubmit: boolean, responses: Array<string | number>, setResponses: React.Dispatch<React.SetStateAction<Array<string | number>>>, props: Props) {
  const {quiz: {questions}, quiz} = props;
  const time = quizTime(quiz);
  if (!questions || time === 'upcoming') {
    return (
      <p>Questions not avalible yet.</p>
    );
  }
  return (
    <div>
      {questions.map((question, idx) => (
        <QuestionCard
          key={idx}
          question={question}
          response={responses[idx]}
          handleResponseChange={handleResponseChange(idx, setResponses, allowSubmit)}
          allowChangeResponse={allowSubmit}/>
        ))}
    </div>
  );
}

const SingleQuizModal: React.FC<Props> = (props: Props) => {
  const {courseID, quiz, history} = props;
  const [responses, setResponses] = useState<Array<string | number>>(initializeResponses(quiz.questions || []));
  const [responseSubmitted, setResponsesSubmitted] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setResponsesSubmitted(true), 10000);
  }, []);

  const time = quizTime(quiz);
  const allowSubmit: boolean = time === 'current' && !responseSubmitted;
  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      show={true}
      onHide={() => history.push(`/course/${courseID}/quiz`)}
      centered
    >
      <Modal.Header className='border-0 pb-0' closeButton>
        <h5 className='font-weight-normal'>{quiz.name}</h5>
      </Modal.Header>
      <Modal.Body className='pl-3 pr-3'>
        <h5 className='text-center font-weight-normal mb-3'>Questions</h5>
        {renderQuestions(allowSubmit, responses, setResponses, props)}
        {
          allowSubmit &&
          <Button className='mt-3 ml-auto mr-auto button primary-gradient shadow'>
            Submit
          </Button>
        }
      </Modal.Body>
    </Modal>
  );
};

export default SingleQuizModal;

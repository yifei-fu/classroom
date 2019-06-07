import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {ListGroup} from 'react-bootstrap';

import ReactTable from 'react-table';
import {Question} from '../../api/type';
import '../../common.css';
import CardContainer from '../CardContainer';
import './modal.css';

export interface Props  {
  question: Question;
  response: number | string;
  allowChangeResponse: boolean;
  handleResponseChange: (response: number | string) => void;
}

function renderChoice(props: Props, choice: string, idx: number) {
  const {response, allowChangeResponse, handleResponseChange} = props;

  let icon;
  const selected: boolean = response !== undefined && response === idx;
  if (selected) {
    icon = <FontAwesomeIcon className='ml-2 mr-2' icon={['far', 'check-circle']}/>;
  } else {
    icon = <FontAwesomeIcon className='ml-2 mr-2' icon={['far', 'circle']}/>;
  }

  return (
      <div
        key={idx}
        className={'p-2 mb-2 shadow-sm post-comment shadow-sm' +
        (allowChangeResponse ? '' : ' disabled-option') +
        (selected ? ' primary-gradient' : '')}
        onClick={() => handleResponseChange(idx)}
      >
        <div className={'post-comment-text' + (selected ? ' text-light' : '')}>
          {icon}
          {choice}
        </div>
      </div>
    );
}

function renderResponse(props: Props) {
  const {question, question: {responseType}, response, allowChangeResponse, handleResponseChange} = props;
  if (responseType === 'choices') {
    return (
      <ListGroup>
        {question.responseChoices &&
        question.responseChoices.map((choice, idx) => renderChoice(props, choice, idx))
        }
      </ListGroup>
    );
  } else if (responseType === 'string') {
    return (
      <textarea
        rows={1}
        disabled={!allowChangeResponse}
        className='form-control text-field shadow-sm'
        aria-describedby='question-response'
        placeholder='Text response'
        value={response}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleResponseChange(event.target.value)}
      />
    );
  } else {
    return (
      <input
        type='number'
        disabled={!allowChangeResponse}
        className='form-control text-field shadow-sm'
        aria-describedby='question-response'
        placeholder='Number response'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleResponseChange(parseInt(event.target.value, 10))}
      />
    );
  }
}

const QuestionCard: React.FC<Props> = (props: Props) => {

  const {question} = props;
  return (
    <CardContainer>
      <h6>{question.title}</h6>
      <p>{question.text}</p>
      {renderResponse(props)}
      {
        question.responses && (
          <ReactTable
            data={question.responses}
            className='rounded20'
            columns={[
              {
                Header: 'Username',
                accessor: 'user.username',
              },
              {
                id: 'name',
                Header: 'Name',
                accessor: (item) => {
                  if (!item.user) {
                    return '';
                  }
                  return `${item.user.firstName} ${item.user.lastName}`;
                },
              },
              {
                Header: 'UID',
                accessor: 'user.uid',
              },
              {
                Header: 'Role',
                accessor: 'user.role',
              },
              {
                Header: 'Answer',
                accessor: 'value',
              }
            ]}
          />
        )
      }
    </CardContainer>
  );
};

export default QuestionCard;

import React, {useEffect, useState} from 'react';
import {Route, RouteComponentProps, Switch} from 'react-router';
import QuizListView from './QuizListView';
import SingleQuizModal from './SingleQuizModal';
import {CourseComponentProps} from './type';

export interface Props extends CourseComponentProps {
}

const QuizView: React.FC<Props> = (props: Props) => {
  const {quizzes} = props.courseDetails;
  return (
    <div>
      <QuizListView {...props}/>
      <Route path='/course/:courseID/quiz/:quizID' render={({match}: RouteComponentProps) => {
        const params = match.params as {courseID: string; quizID: string; };
        const quiz = quizzes.find((quiz) => quiz.id === params.quizID);
        if (!quiz) {
          return <div>404 - Quiz does not exist.</div>;
        }
        return (
          <SingleQuizModal {...props} courseID={params.courseID} quiz={quiz}/>
        );
      }}/>
    </div>
  );
};

export default QuizView;

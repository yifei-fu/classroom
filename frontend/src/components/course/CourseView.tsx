import {History} from 'history';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {match, Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import CourseOverview from './CourseOverview';
import DiscussionView from './DiscusionView';
import QuizView from './QuizView';

import './CourseView.css';

export interface Props extends RouteComponentProps {
  id: string;
}

function renderTabs(history: History, match: match, id: string): React.ReactNode {
  return (
    <div className='tabs-container'>
        {views.map(({path, displayName}: View) => {
            let variant: 'outline-secondary' | 'outline-light' = 'outline-secondary';
            let className: 'tab' | 'tab tab-active' = 'tab';
            if (path === match.path) {
              variant = 'outline-light';
              className = 'tab tab-active';
            }
            return (
              <Button
                variant={variant}
                className={className}
                onClick={() => history.push(path.replace(':courseID', id))}
              >
                {displayName}
              </Button>
            );
          })}
    </div>
  );
}

interface View {
  path: string;
  displayName: string;
  component: React.FunctionComponent;
}

const views: View[] = [
  {
    path: '/course/:courseID/overview',
    displayName: 'Overview',
    component: CourseOverview,
  },
  {
    path: '/course/:courseID/quiz',
    displayName: 'Quiz',
    component: QuizView,
  },
  {
    path: '/course/:courseID/discussion',
    displayName: 'Discussion',
    component: DiscussionView,
  },
];

const CourseView: React.FC<Props> = (props: Props) => {
  const {id} = props;
  return (
        <div>
          <h1 className='display-4'>Course {id}</h1>
          <Switch>
            {views.map(({path}: View) => (
              <Route exact path={path} render={({history, match}: RouteComponentProps) => renderTabs(history, match, id)} />
            ))}
            <Redirect to={`/course/${id}/overview`}/>
          </Switch>
          <div>
            <Switch>
              {views.map(({path, component}: View) => (
                <Route exact path={path} component={component} />
              ))}
            </Switch>
          </div>
        </div>
    );
};

export default withRouter(CourseView);

import {History} from 'history';
import React, {useEffect, useState} from 'react';
import {Button, Spinner} from 'react-bootstrap';
import {match, Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import CourseOverview from './CourseOverview';
import DiscussionView from './DiscusionView';
import QuizView from './QuizView';

import APIManager from '../../api/APIManager';
import {CourseDetails} from '../../api/type';

import '../../common.css';
import './CourseView.css';
import {CourseComponentProps} from './type';

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
  render: (props: CourseComponentProps) => React.ReactNode;
}

const views: View[] = [
  {
    path: '/course/:courseID/overview',
    displayName: 'Overview',
    render: ((props) => <CourseOverview {...props} />),
  },
  {
    path: '/course/:courseID/quiz',
    displayName: 'Quiz',
    render: ((props) => <QuizView {...props} />),
  },
  {
    path: '/course/:courseID/discussion',
    displayName: 'Discussion',
    render: ((props) => <DiscussionView {...props} />),
  },
];

const CourseView: React.FC<Props> = (props: Props) => {
  const {id} = props;
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    APIManager.getCourseDetails(id).then((courseDetails) => {
      setCourseDetails(courseDetails);
      setLoading(false);
    });
  }, []);

  if (loading || !courseDetails) {
    return (
      <Spinner className='spinner' animation='border' />
    );
  }

  return (
        <div>
          <h1 className='font-weight-light m-2'>{courseDetails.name}</h1>
          <Switch>
            {views.map(({path}: View) => (
              <Route
                exact
                path={path}
                render={({history, match}: RouteComponentProps) => renderTabs(history, match, id)}
              />
            ))}
            <Redirect to={`/course/${id}/overview`}/>
          </Switch>
          <div>
            <Switch>
              {views.map(({path, render}: View) => (
                <Route exact path={path} render={(props) => render({...props, courseDetails})} />
              ))}
            </Switch>
          </div>
        </div>
    );
};

export default withRouter(CourseView);

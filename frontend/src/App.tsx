import React from 'react';
import AuthView from './components/AuthView';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import JoinCourseView from './components/JoinCourseView';

import {BrowserRouter as Router, Route, RouteComponentProps, Switch} from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar';
import CourseView from './components/course/CourseView';

// Font Awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import * as icons from '@fortawesome/free-solid-svg-icons';

[icons.faChevronDown, icons.faChevronUp, icons.faUser, icons.faClock, icons.faPlus, icons.faTags].forEach((icon) => library.add(icon));

const App: React.FC = () => {
  return (
    <div className='App'>
      <AppBar/>
      <Router>
        <Switch>
          <Route exact path='/signin' component={AuthView} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/' component={HomePage} />
          <Route path='/course/:courseID' render={({match}: RouteComponentProps) => {
            return (
              <CourseView id={(match.params as {courseID: string}).courseID}/>
            );
          }}/>
          <Route path='/enroll/:id' component={JoinCourseView}/>
          <Route component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

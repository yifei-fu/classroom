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
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';

// react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

library.add(solidIcons.faChevronDown, solidIcons.faChevronUp, regularIcons.faUser, regularIcons.faClock, solidIcons.faPlus, solidIcons.faTags, regularIcons.faHourglass, regularIcons.faCircle, regularIcons.faCheckCircle);

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
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;

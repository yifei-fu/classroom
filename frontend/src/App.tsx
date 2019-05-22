import React from 'react';
import AuthView from './components/AuthView';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import JoinCourseView from './components/JoinCourseView';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar';

const App: React.FC = () => {
  return (
    <div className='App'>
      <AppBar/>
      <Router>
        <div>
          <Route exact path='/signin' component={AuthView} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/' component={HomePage} />
          <Route path='/course/:id/enroll' component={JoinCourseView}/>
        </div>
      </Router>
    </div>
  );
};

export default App;

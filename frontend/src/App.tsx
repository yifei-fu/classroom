import React from 'react';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AuthView from './components/AuthView';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from './components/AppBar';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppBar/>
      <Router>
        <div>
          <Route exact path="/signin" component={AuthView} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={HomePage} />
        </div>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import APIManager from './APIManager';
import AuthView from './AuthView';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/" exact component={AuthView} />
        </div>
      </Router>
    </div>
  );
}

export default App;

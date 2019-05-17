import React from 'react';
import { Navbar } from 'react-bootstrap';
import './AppBar.css';

const AppBar: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" className="AppBar">
            <Navbar.Brand href="#home">
                {'InQuizitive'}
            </Navbar.Brand>
        </Navbar>
    );
}

export default AppBar;



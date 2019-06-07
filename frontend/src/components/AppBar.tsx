import React from 'react';
import { Navbar, Form, Button } from 'react-bootstrap';
import './AppBar.css';

const AppBar: React.FC = () => {
    return (
        <Navbar bg='dark' variant='dark' className='AppBar shadow'>
            <Navbar.Brand href='/dashboard'>
                {'InQuizitive'}
            </Navbar.Brand>
            <Form inline>
                <Button className="btn-primary-outline" onClick={sendNotification}></Button>
            </Form>
        </Navbar>
        );
    };
    
export default AppBar;

function sendNotification(event: any) {
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        createNotification();
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                createNotification();
            }
        });
    }

    // Finally, if the user has denied notifications and you 
    // want to be respectful there is no need to bother them any more.
}

function createNotification() {
    setTimeout(function () {
        var img = 'https://banner2.kisspng.com/20180318/xse/kisspng-book-cartoon-royalty-free-clip-art-hand-painted-open-book-5aae50281fbb54.51412376152137322413.jpg';
        var text = 'COM SCI 130 has a new quiz ready for you';
        var notification = new Notification('Inquizitive', { body: text, icon: img });
        notification.onclick = function(event) {
            event.preventDefault();
            window.open("/dashboard");
        }
    }, 10000);
}


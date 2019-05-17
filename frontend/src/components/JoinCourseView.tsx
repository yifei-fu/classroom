import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

var stuff: string | undefined;

function JoinCourseView({ match }: { match: any }) {
    const id = match.params.id;

    // get course name from server using

    return (
        <div>
            <h1>Course title: TBD </h1>
            <h2>Course id: {id}</h2>
            <br></br>
            <br></br>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="joinClassSecret" >
                    <Form.Label style={{ justifyContent: "left" }}>Class code</Form.Label>
                    <Form.Control type="text" value={stuff} placeholder="Code" onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Join class
                </Button>
            </Form>          
        </div>
    );
}

function handleChange(event: any) {

}

function handleSubmit(event: any) {
    event.preventDefault();
    console.log(event);
    alert('This feature isn\'t enabled yet, but stay tuned!');
    event.preventDefault();
}


export default JoinCourseView;

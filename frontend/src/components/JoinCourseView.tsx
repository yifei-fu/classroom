import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

let joinSecret: string | undefined;

function JoinCourseView({ match }: { match: any }) {
    const id = match.params.id;

    // get course name from server using

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card className='course-card shadow-sm p-3 mb-5 bg-white rounded' style={{ width: '500px' }}>
                <Card.Body>
                    <Card.Title>COM SCI 130: Software Engineering</Card.Title>
                    <br></br>
                    <Card.Text>Course id: <b>{id}</b> </Card.Text>
                    <br></br>
                    <br></br>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='joinClassSecret' >
                            <Form.Label style={{ justifyContent: 'left' }}>Class code</Form.Label>
                            <Form.Control type='text' placeholder='Code' onChange={handleChange}/>
                        </Form.Group>
                        <Button variant='primary' type='submit' >
                            Join class
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

function handleChange(event: any) {
    joinSecret = event.currentTarget.value;
}

function handleSubmit(event: any) {
    if (joinSecret == undefined) {
        alert('You must give a valid class key to join.');
    } else {
        console.log(joinSecret);
    }
    event.preventDefault();
}

export default JoinCourseView;

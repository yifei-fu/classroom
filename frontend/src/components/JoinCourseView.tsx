import React, { useEffect, useState } from 'react';
import {CourseDetails} from '../api/type';
import { Button, Card, Col, Form, FormCheck, InputGroup, Spinner } from 'react-bootstrap';
import { match, Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import APIManager from '../api/APIManager';
import { EnrollCourseRequestBody } from '../api/type';

export interface JoinCourseViewProps extends RouteComponentProps {
    id: string;
}

export interface JoinCourseViewState {
    validated: boolean;
    loading: boolean
    courseDetails: CourseDetails | undefined;
}

var joinSecret: string;

class JoinCourseView extends React.Component<JoinCourseViewProps, JoinCourseViewState> {

    constructor(props: JoinCourseViewProps) {
        super(props);
        this.state = { validated: false, loading: true, courseDetails: undefined };
        APIManager.getCourseDetails(this.props.id).then((courseDetails) => {
            this.setState({courseDetails: courseDetails, loading: false});
        });
    }

    render() {
        if (this.state.loading || !this.state.courseDetails) {
            return (
                <Spinner className='spinner' animation='border' />
            );
        }
        var courseDetails = this.state.courseDetails;
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card className='course-card shadow-sm p-3 mb-5 bg-white rounded' style={{ width: '500px' }}>
                    <Card.Body>
                        <Card.Title>{courseDetails.name}</Card.Title>
                        <Card.Subtitle>ID: <b>{this.props.id}</b> </Card.Subtitle>
                        <br></br>
                        <br></br>
                        <Form
                            noValidate
                            validated={this.state.validated}
                            onSubmit={(e:any) => this.handleSubmit(e)}
                        >
                            <Form.Group controlId='joinClassSecret' >
                                    <div style={{ display: 'flex', justifyContent: 'left' }}>
                                        <Form.Label>Enter code to join:</Form.Label>
                                    </div>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Code"
                                        onChange={(e: any) => this.handleChange(e)}
                                    />
                                    <Form.Control.Feedback type="invalid">Must enter a valid code to join the class</Form.Control.Feedback>
                                </Form.Group>
                            <Button type="submit">Join class</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    handleChange(event: any) {
        joinSecret = event.currentTarget.value;
    }

    componentDidCatch(error: any, info: any) {
        console.log(error);
    }


    handleSubmit(event: any) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({ validated: true });
         if (joinSecret !== undefined && joinSecret !== ' ') {
            var requestBody: EnrollCourseRequestBody = { joinSecret: joinSecret };

            // carry out PUT request to see if it's the correct enrollment key
            try {
                console.log("Trying!");
                APIManager.enrollCourse(this.props.id, requestBody).then(() => {
                    console.log("Enrolled in class");
                    this.props.history.push(`/course/${this.props.id}`);
                });
                //this.props.history.push(`/course/${this.props.id}`);
            }
            catch {
                console.log("Failed!");
                alert('Invalid join code.');
            }
        }
    }
}

export default withRouter(JoinCourseView);

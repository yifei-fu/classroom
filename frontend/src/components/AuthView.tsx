import React from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router';
import queryString from 'query-string'
import './AuthView.css';
import Auth from '../api/Auth';

// handle the ?next URL to redirect after auth

export interface AuthViewState {
    nextUrl: string | null | undefined;
}

class AuthView extends React.Component<RouteComponentProps, AuthViewState> {
    constructor(props: RouteComponentProps) {
        super(props);
        if (!!props.location.search && !!queryString.parse(props.location.search).next) {
            const values = queryString.parse(props.location.search);
            this.state = { nextUrl: values.next as string };
        }
        else {
            this.state = { nextUrl: undefined};
        }
    }

    handleSignIn(event: any) {
        event.preventDefault();
        event.stopPropagation();
        let form = event.currentTarget;
        let username = form.elements.formUsername.value;
        let password = form.elements.formBasicPassword.value;
        try {
            Auth.login(username, password);
            if (this.state.nextUrl !== undefined) {
                this.props.history.push('/' + this.state.nextUrl);
            }
            else {
                this.props.history.push('/dashboard');
            }
        }
        catch {
            console.log("Login error");
        }
    }

    handleSignUp(event: any) {

    }

    render() {
        return (
            <div className='root'>
                <div className='form shadow p-3 mb-5 bg-white rounded'>
                    <h3>Sign Up</h3>
                    <Form className='form' onSubmit={(e:any) => this.handleSignUp(e)}>
                        <Form.Row>
                            <Form.Group controlId='formGridName'>
                                <Col >
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type='firstname' placeholder='First Name' />
                                    <Form.Control type='lastname' placeholder='Last Name' />
                                </Col >
                            </Form.Group>

                            <Form.Group controlId='formGridUsername'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='username' placeholder='Enter username' />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId='formGridEmail'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type='email' placeholder='Enter email' />
                                <Form.Text className='text-muted'>
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>

                            <Form.Group controlId='formGridRadios'>
                                <Form.Label >
                                    Account Type
                            </Form.Label>
                                <Col >
                                    <Form.Check
                                        type='radio'
                                        label='Student'
                                        name='formStudentRadio'
                                        id='formStudentRadio'
                                    />
                                    <Form.Check
                                        type='radio'
                                        label='Professor'
                                        name='formProfessor'
                                        id='formProfessor'
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group controlId='formUID'>
                                <Form.Label>UID</Form.Label>
                                <Form.Control type='UID' placeholder='Enter UCLA UID' />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId='formBasicPassword'>
                                <Col >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' placeholder='Password' />
                                </Col >
                            </Form.Group>

                            <Form.Group controlId='formBasicPasswordConfirm'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type='confirm_password' placeholder='Password' />
                            </Form.Group>
                        </Form.Row>

                        <Button variant='primary' type='submit'>
                            Sign Up
                    </Button>
                    </Form>
                </div>
                <div className='form shadow p-3 mb-5 bg-white rounded'>
                    <h3>Sign In</h3>
                    <Form className='form' onSubmit={(e: any) => this.handleSignIn(e)}>
                        <Form.Row>
                            <Form.Group controlId='formUsername'>
                                <Col >
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type='username' placeholder='Enter username' />
                                </Col >
                            </Form.Group>

                            <Form.Group controlId='formBasicPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder='Password' />
                            </Form.Group>
                        </Form.Row>

                        <Button variant='primary' type='submit'>
                            Sign In
                    </Button>

                    </Form>
                </div>
            </div>
        );
    }
}

export default AuthView;

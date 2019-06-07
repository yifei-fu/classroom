import React, {useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {RouteComponentProps} from 'react-router';
import {toast} from 'react-toastify';
import APIManager from '../api/APIManager';
import Auth from '../api/Auth';
import {UserSignInRequestBody, UserSignUpRequestBody} from '../api/type';
import './AuthView.css';

interface Props extends RouteComponentProps {

}

const AuthView: React.FC<Props> = (props) => {
    const [signUpFormData, setSignUpFormData] = useState<UserSignUpRequestBody>({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        isInstructor: false,
        uid: '',
    });
    const [signInFormData, setSignInFormData] = useState<UserSignInRequestBody>({
        username: '',
        password: '',
    });

    const handleSignUpChange = (field: 'username' | 'email' | 'password' | 'firstName' | 'lastName' | 'isInstructor' | 'uid') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSignUpFormData((prevState: UserSignUpRequestBody) => ({...prevState, [field]: value}));
    };

    const handleSignInChange = (field: 'username' | 'password') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSignInFormData((prevState: UserSignInRequestBody) => ({...prevState, [field]: value}));
    };

    const handleSignUpSubmit = () => {
        Auth.signUp(signUpFormData).then(() => {
            const {history} = props;
            toast.success('Successfully created new user.');
            history.push('/dashboard');
        }).catch((err) => {
            toast.error('Cannot create new user right now.');
        });
    };
    const handleSignInSubmit = () => {
        Auth.signIn(signInFormData).then(() => {
            const {history} = props;
            toast.success('Successfully signed in.');
            history.push('/dashboard');
        }).catch((err) => {
            toast.error('Cannot sign in. Invalid credentials provided.');
        });
    };

    return (
        <div className='root'>
            <div className='form shadow p-3 mb-5 bg-white'>
                <h3 className='font-weight-normal'>Sign Up</h3>
                <Form className='form'>
                    <Form.Row>
                        <div className='col-md-4 mb-3'>
                            <label htmlFor='first-name'>First name</label>
                            <input type='text' className='form-control' id='first-name'
                                   placeholder='First Name' value={signUpFormData.firstName} onChange={handleSignUpChange('firstName')} required/>
                        </div>
                        <div className='col-md-4 mb-3'>
                            <label htmlFor='last-name'>Last name</label>
                            <input type='text' className='form-control' id='last-name' placeholder='Last Name'
                                   value={signUpFormData.lastName}  onChange={handleSignUpChange('lastName')} required/>
                        </div>
                        <div className='col-md-4 mb-3'>
                            <label htmlFor='username'>Username</label>
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <span className='input-group-text' id='inputGroupPrepend2'>@</span>
                                </div>
                                <input type='text' className='form-control' id='username'
                                       placeholder='Username' aria-describedby='username' value={signUpFormData.username} onChange={handleSignUpChange('username')} required/>
                            </div>
                        </div>
                    </Form.Row>

                    <Form.Row>
                        <div className='col-md-4 mb-3 form-group'>
                            <label htmlFor='email'>Email address</label>
                            <input type='email' className='form-control' id='email' value={signUpFormData.email} onChange={handleSignUpChange('email')}
                                   aria-describedby='emailHelp' placeholder='Enter email'/>
                        </div>
                        <div className='col-md-4 mb-3'>
                            <label htmlFor='uid'>UID</label>
                            <input type='text' className='form-control' id='uid' value={signUpFormData.uid} onChange={handleSignUpChange('uid')}
                                   placeholder='UID' required/>
                        </div>
                    </Form.Row>
                    <Form.Row>
                        <div className='col-md-4 mb-3'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className='form-control' id='password' value={signUpFormData.password} onChange={handleSignUpChange('password')}
                                   placeholder='Password' required/>
                        </div>
                    </Form.Row>
                    <Form.Row>
                        <div className='custom-control custom-checkbox mb-3'>
                            <input type='checkbox' className='custom-control-input' id='isInstructor'
                                   required checked={signUpFormData.isInstructor} onChange={(event) => {
                                       const {checked} = event.target;
                                       setSignUpFormData((prevState) => ({...prevState, isInstructor: checked}));
                            }}/>
                            <label className='custom-control-label' htmlFor='isInstructor'>I am an instructor</label>
                        </div>
                    </Form.Row>
                    <Button
                      className='mt-3 ml-auto mr-auto button primary-gradient shadow'
                      onClick={handleSignUpSubmit}
                    >
                            Submit
                    </Button>
                </Form>
            </div>
            <div className='form shadow p-3 mb-5 bg-white'>
                <h3 className='font-weight-normal'>Sign Up</h3>
                <Form className='form'>
                    <Form.Row>
                        <div className='mb-3'>
                            <label htmlFor='username'>Username</label>
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <span className='input-group-text' id='inputGroupPrepend2'>@</span>
                                </div>
                                <input type='text' className='form-control' id='username'
                                       placeholder='Username' aria-describedby='username' value={signInFormData.username} onChange={handleSignInChange('username')} required/>
                            </div>
                        </div>
                    </Form.Row>
                    <Form.Row>
                        <div className='mb-3 w-100'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className='form-control' id='password' value={signInFormData.password} onChange={handleSignInChange('password')}
                                   placeholder='Password' required/>
                        </div>
                    </Form.Row>
                    <Button
                      className='mt-3 ml-auto mr-auto button primary-gradient shadow'
                      onClick={handleSignInSubmit}
                    >
                        Submit
                    </Button>
                </Form>
            </div>

        </div>

    );
};

export default AuthView;

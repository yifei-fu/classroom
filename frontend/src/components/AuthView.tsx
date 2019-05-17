import React from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import "./AuthView.css";

const AuthView: React.FC = () => {
    return (
        <div className="root">
					<Form>
					  <Form.Row>
					    <Form.Group  controlId="formGridName">
					    <Col >
                <Form.Label>Full Name</Form.Label>
                  <Form.Control type="firstname" placeholder="First Name" />
                  <Form.Control type="lastname" placeholder="Last Name" />  
					    </Col >
					    </Form.Group>

					    <Form.Group controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" />
					    </Form.Group>
					  </Form.Row>

					<Form.Row>
					  <Form.Group controlId="formGridEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
					  </Form.Group>

					  <Form.Group controlId="formGridRadios">
                <Form.Label >
                  Account Type
                </Form.Label>
                <Col >
                  <Form.Check
                    type="radio"
                    label="Student"
                    name="formStudentRadio"
                    id="formStudentRadio"
                  />
                  <Form.Check
                    type="radio"
                    label="Professor"
                    name="formProfessor"
                    id="formProfessor"
                  />
                </Col>
					  </Form.Group>

					  <Form.Group controlId="formUID">
					  		  <Form.Label>UID</Form.Label>
		              <Form.Control type="UID" placeholder="Enter UCLA UID" />
		        </Form.Group>

					</Form.Row>

					  <Form.Row>
              <Form.Group controlId="formBasicPassword">
              <Col >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
               </Col >
              </Form.Group>

              <Form.Group controlId="formBasicPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="confirm_password" placeholder="Password" />
              </Form.Group>
					  </Form.Row>

					  <Button variant="primary" type="submit">
					    Sign Up
					  </Button>

						<Form.Row>
              <Form.Group controlId="formUsername">
              <Col >
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" />
              </Col >
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Sign In
            </Button>


					</Form>
        </div>
    );
}

export default AuthView;

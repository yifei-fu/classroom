import React from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import "./AuthView.css";

const AuthView: React.FC = () => {
    return (
        <div className="root">
					<Form style={{ width: '500px' }}>
						<Row>

							<Form.Group controlId="formfullname">
							<Form.Label>Full Name</Form.Label>
						      <Form.Control placeholder="First name" />
						      <Form.Control placeholder="Last name" />
					    </Form.Group>
					  </Row>

						<Row>
						  <Form.Group controlId="formUsername">
						    <Form.Label>Username</Form.Label>
						    <Form.Control type="username" placeholder="Enter username" />
						  </Form.Group>

						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Email address</Form.Label>
						    <Form.Control type="email" placeholder="Enter email" />
						    <Form.Text className="text-muted">
						      We'll never share your email with anyone else.
						    </Form.Text>
						  </Form.Group>

					    <Form.Group as={Row}>
					      <Form.Label column >
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

					  </Row>

				  	<Form.Group controlId="formUID">
					    <Form.Label>UID</Form.Label>
					    <Form.Control type="UID" placeholder="Enter UCLA UID" />
					  </Form.Group>

					  <Row>
						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Password</Form.Label>
						    <Form.Control type="password" placeholder="Password" />
						  </Form.Group>

						  <Form.Group controlId="formBasicPasswordConfirm">
						    <Form.Label>Confirm Password</Form.Label>
						    <Form.Control type="confirm_password" placeholder="Password" />
						  </Form.Group>
						</Row>

						  <Button variant="primary" type="submit">
						    Sign Up
						  </Button>

						  <Form.Group controlId="formUsername">
						    <Form.Label>Username</Form.Label>
						    <Form.Control type="username" placeholder="Enter username" />
						  </Form.Group>

						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Password</Form.Label>
						    <Form.Control type="password" placeholder="Password" />
						  </Form.Group>


					  <Button variant="primary" type="submit">
					    Sign In
					  </Button>

					</Form>;
        </div>
    );
}

export default AuthView;

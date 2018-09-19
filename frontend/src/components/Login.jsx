import React, {Component} from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import { Form, FormGroup, FormControl, Col, Button, Alert, InputGroup, Glyphicon } from 'react-bootstrap'

class Login extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        loggedIn: false,
        errLoginMessage: ''
    }

    /*
    *************************************************
    Set inputs values to state
    *************************************************
    */

    handleChange = ({target: { name,value }}) => {
        this.setState({[name]: value})
    }

    /*
    **********************************************************************
    Send user inputs to to Django REST API endpoint
    *****************************************************************
    */

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/rest-auth/login/', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            this.setState({loggedIn: true});
            localStorage.setItem('react-token', JSON.stringify(response.data.token));
            this.props.history.push('/');
        }).catch(error => {
            console.log(error.response.data.non_field_errors)
            this.setState({errLoginMessage: error.response.data.non_field_errors});
        })
    }

    /*
    *************************************************
    Validate user inputs(username, email, passwords)
    *************************************************
    */

    getPasswordValidationState = () => {
        const length = this.state.password.length;
        if (length > 8)
            return 'success';
        else if (length > 0)
            return 'error';
        return null;
    }

    getUsernameValidationState = () => {
        const length = this.state.username.length;
        if (length > 5)
            return 'success';
        else if (length > 0)
            return 'error';
        return null;
    }

    /*
    *************************************************
    Enable submit button only if inputs validated
    *************************************************
    */


    checkSubmit = () =>{
        if (this.getUsernameValidationState() ==='success' && this.getPasswordValidationState() ==='success'){
            return(
                <Button type="submit">Sign in</Button>

                )
        }
        else{
            return(
               <Button type="submit" disabled>Sign in</Button>
                )
        }
    }


    /*
    *************************************************
    Check wether user logged in or not
    *************************************************
    */

    errorLogin = () => {
        if (this.state.errLoginMessage) {
            return (<Alert bsStyle="danger">
                <strong>Error!</strong>
                <p>{this.state.errLoginMessage}</p>
            </Alert>)
        }
    }

    render() {
        return (
            <div>
                <Col sm={6} smOffset={3}>
                    <img width={100} height={100} src={logo} alt='React'/>
                </Col>
                <Col sm={8} smOffset={2}>
                    <h4>Minimal login page</h4>
                </Col>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup controlId="formHorizontalText" validationState={this.getUsernameValidationState()}>
                        <Col sm={12}>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <Glyphicon glyph="user"/>
                                </InputGroup.Addon>
                                <FormControl type="text" placeholder="Username" name='username' value={this.state.username} onChange={this.handleChange}/>
                                <FormControl.Feedback/>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword" validationState={this.getPasswordValidationState()}>
                        <Col sm={12}>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <Glyphicon glyph="lock"/>
                                </InputGroup.Addon>
                                <FormControl type="password" placeholder="Password" name='password' onChange={this.handleChange}/>
                                <FormControl.Feedback/>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            {this.errorLogin()}
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            <p>Don't have an account?<a href='registration'> Register Now</a></p>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={4} smOffset={4}>
                            {this.checkSubmit()}
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
export default Login;

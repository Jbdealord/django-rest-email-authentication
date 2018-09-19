import React, {Component} from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import {Form, FormGroup, FormControl, Col, Button, Alert, InputGroup, Glyphicon } from 'react-bootstrap'


class Login extends Component {

    state = {
        username: '',
        email: '',
        password1: '',
        password2: '',
        regSuccess: false,
        errMessages: []
    }

    handleChange = ({
        target: {name, value}}) => {
            this.setState({[name]: value})
    }


    /*
    ************************************************
    Send user inputs to to Djanfo REST API endpoint
    ************************************************
    */

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/rest-auth/registration/', {
            username: this.state.username,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2
        }).then(response => {
            this.setState({regSuccess: true});
        }).catch(error => {
             this.setState({errMessages: error.response.data});
        })
    }

    /*
    ****************************************************************
    Check backend response: if something wrong error message appear
    ****************************************************************
    */

    registrationCheck = () => {
        if (this.state.regSuccess) {
            console.log();
            return (
                <Alert bsStyle="success">
                    <p>Your registration was successful! A verfication email was send, please verify and after you can <a href="/login">login</a>!</p>
                </Alert>
            )
        }

        // If email alredy registered
        else if (this.state.errMessages.email){
            return(
                <Alert bsStyle="danger">
                    <p>{this.state.errMessages.email}</p>
                </Alert>
            )
        }

       // If username alredy registered
        else if (this.state.errMessages.username){
            return(
                <Alert bsStyle="danger">
                    <p>{this.state.errMessages.username}</p>
                </Alert>
            )
        }

        // If the two password didn't matched
        else if (this.state.errMessages.non_field_errors){
            return(
                <Alert bsStyle="danger">
                    <p>{this.state.errMessages.non_field_errors}</p>
                </Alert>
            )
        }
    }

    /*
    *************************************************
    Validate user inputs(username, email, passwords)
    *************************************************
    */

    getUsernameValidationState = () => {
        const length = this.state.username.length;
        if (length > 5)
            return 'success';
        else if (length > 0)
            return 'error';
        return null;
    }

    getEamilValidationState = () => {
        const email = this.state.email;
        // Email must have email format
        const regex =  /\S+@\S+\.\S+/;
        if (regex.test(email)){
                return 'success';
            }
        else if (email.length > 0)
            return 'error';
        return null;
    }


    getPasswordFirstValidationState = () => {
        let pswd =this.state.password1
        // Password must have contain at least eight characters, at least one number and both lower and uppercase letters and special characters
        let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
        if (regex.test(pswd)){
                return 'success';
            }
        else if (pswd.length > 0)
            return 'error';
        return null;
    }

    getPasswordSecondValidationState = () => {
        let pswd =this.state.password2
        // Password must have contain at least eight characters, at least one number and both lower and uppercase letters and special characters
        let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
        if (regex.test(pswd)){
                return 'success';
            }
        else if (pswd.length > 0)
            return 'error';
        return null;
    }

    checkSubmit = () => {
        if (this.getUsernameValidationState() ==='success' && this.getEamilValidationState() ==='success' && this.getPasswordFirstValidationState() ==='success' && this.getPasswordSecondValidationState() ==='success'){
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

    render() {
        return (
            <div>
                <Col sm={6} smOffset={3}>
                    <img width={100} height={100} src={logo} alt='React'/>
                </Col>
                <Col sm={10} smOffset={1}>
                    <h4>Minimal registration page</h4>
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
                   <FormGroup controlId="formHorizontaEmail"  validationState={this.getEamilValidationState()}>
                       <Col sm={12}>
                           <InputGroup>
                               <InputGroup.Addon>
                                   <Glyphicon glyph="envelope"/>
                               </InputGroup.Addon>
                               <FormControl type="email" placeholder="Email" name='email' onChange={this.handleChange}/>
                               <FormControl.Feedback/>
                           </InputGroup>
                       </Col>
                   </FormGroup>
                    <FormGroup controlId="formHorizontalPasswordFirst" validationState={this.getPasswordFirstValidationState()}>
                        <Col sm={12}>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <Glyphicon glyph="lock"/>
                                </InputGroup.Addon>
                                <FormControl type="password" placeholder="Password" name='password1'  onChange={this.handleChange}/>
                                <FormControl.Feedback/>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPasswordSecond"  validationState={this.getPasswordSecondValidationState()}>
                        <Col sm={12}>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <Glyphicon glyph="lock"/>
                                </InputGroup.Addon>
                                <FormControl type="password" placeholder="Password" name='password2' onChange={this.handleChange}/>
                                <FormControl.Feedback/>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            {this.registrationCheck()}
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

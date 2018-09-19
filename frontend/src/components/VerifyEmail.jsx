import React, {Component} from 'react';
import {Alert} from 'react-bootstrap'
import axios from 'axios';

/*
Based on the http response the function show email verification message
*/

const CheckVerifiedEamil = (props) => {
    let status = props.is_verified;
    const loading = props.loading;
    if (loading === false) {
        if (status) {
            return (
                <Alert bsStyle="success">
                    <h4>Email verification</h4>
                    <p>
                        You successfully registered your email adress, now you can <a href="/login">login</a>!
                    </p>
                </Alert>
            )
        } else {
            return (
                <Alert bsStyle="danger">
                    <h4>Email verification</h4>
                    <p>
                        {props.error_message}
                    </p>
                </Alert>
            )
        }
    } else {
        return (<p></p>)
    }
}


class VerifyEmail extends Component {
    state = {
        errorMessage: '',
        key: this.props.match.params.key,
        loading: true
    }

   componentDidMount() {
        axios.post('http://localhost:8000/api/verify-email-frontent/', {
            key: this.state.key
            }).then(response => {
            if (response.status === 200) {
                this.setState({
                    isVerified: true,
                    verificationMessage: response.data.detail,
                    loading: false
                });
            }
        }).catch(error => {
            this.setState({
                isVerified: false,
                loading: false,
                errorMessage: error.response.data.detail
            });
        })
    }
    render() {
        return (
            <CheckVerifiedEamil is_verified={this.state.isVerified} error_message={this.state.errorMessage} loading={this.state.loading}/>
        )
    }
}

export default VerifyEmail;

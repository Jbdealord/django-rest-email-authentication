import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Col, Jumbotron, Button} from 'react-bootstrap'

class Content extends Component {

    /*
    *************************************************
    logging out (drop saved localStorage)
    *************************************************
    */

    handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('react-token')
        this.props.history.push('/login');
    }

    render() {
        if (localStorage.getItem('react-token') !== null) {
            return (
             <Jumbotron>
                <h1>Welcome!</h1>
                <p>
                    You successfully logged in to the Django/React powered webpage.
                </p>
                <form onSubmit={this.handleLogout}>
                   <Button   type="submit" bsStyle="info">Logout</Button>
                </form>
            </Jumbotron>)
        }
        else {
            return (
            <Col sm={8} smOffset={2}>
                <h1>Please<a href="/login"> login </a>to see this page!</h1>
            </Col>)
        }
    }
}

export default withRouter(Content);

import React, {Component} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Login from './components/Login';
import Content from './components/Content';
import Registration from './components/Registration';
import VerifyEmail from './components/VerifyEmail';
import {Grid, Row, Col} from 'react-bootstrap'
import './App.css'

class App extends Component {
    render() {
        return (
        <Router>
            <Grid className='content'>
                <Row className="show-grid">
                    <Col lg={4} lgOffset={4}>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/registration" component={Registration}/>
                        <Route exact path="/verify-email/:key" component={VerifyEmail}/>
                    </Col>
                    <Col lg={12}>
                         <Route exact path="/" component={Content}/>
                    </Col>
                </Row>
            </Grid>
        </Router>)
    };
}

export default App;

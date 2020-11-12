import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div className="flex-col">
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Log In</Link>
            </div>
        )
    }
}

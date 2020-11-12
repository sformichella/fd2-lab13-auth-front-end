import React, { Component } from 'react';
import request from 'superagent';

export default class SignUp extends Component {

    state = {
        loading: false,
        email: '',
        password: ''
    }

    handleTextInputChange = (input, e) => {
        this.setState({
            [input]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true });

        const userSignIn = await request
            .post('https://aqueous-garden-07137.herokuapp.com/auth/signup')
            .send(this.state);

        this.setState({ loading: false });

        this.props.updateUserInfo(userSignIn.body.email, userSignIn.body.token);

        this.props.history.push('/todos');
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Email:
                        <input
                            type = "text"
                            onChange={(e) => this.handleTextInputChange('email', e)}
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type = "password"
                            onChange={(e) => this.handleTextInputChange('password', e)}
                        />
                    </label>
                    {
                        this.state.loading
                            ? 'Loadering'
                            : <button>Sign Up</button>
                    }

                </form>
            </div>
        )
    }
}

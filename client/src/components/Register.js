import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
       
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(newUser, this.props.history); 
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-field col-s-12">
                        <input
                            onChange={this.handleChange}
                            value={this.state.name}
                            error={errors.name}
                            name="name"
                            type="text"
                            className={classnames("", {
                                invalid: errors.name
                            })}
                        />
                        <label htmlFor="name">Name</label>
                        <span className="red-text">{errors.name}</span>
                    </div>
                    <div className="input-field col-s-12">
                        <input
                            onChange={this.handleChange}
                            value={this.state.email}
                            error={errors.email}
                            name="email"
                            type="email"
                            className={classnames("", {
                                invalid: errors.email
                            })}
                        />
                        <label htmlFor="email">Email</label>
                        <span className="red-text">{errors.email}</span>
                    </div>
                    <div className="input-field col-s-12">
                        <input
                            onChange={this.handleChange}
                            value={this.state.password}
                            error={errors.password}
                            name="password"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password
                            })}
                        />
                        <label htmlFor="password">Password</label>
                        <span className="red-text">{errors.password}</span>
                    </div>
                    <div className="input-field col-s-12">
                        <input
                            onChange={this.handleChange}
                            value={this.state.password2}
                            error={errors.password2}
                            name="password2"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password2
                            })}
                        />
                        <label htmlFor="password2">Confirm Password</label>
                        <span className="red-text">{errors.password2}</span>
                    </div>
                    <div className="col-s-12">
                        <button type='submit' className='customBtn'>
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
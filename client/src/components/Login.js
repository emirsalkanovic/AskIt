import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
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

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData);
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <form noValidate onSubmit={this.onSubmit} >
                    <div className="input-field col-s-12">
                        <input
                            onChange={this.handleChange}
                            value={this.state.email}
                            error={errors.email}
                            name="email"
                            type="email"
                            className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                            })}
                        />
                        <label htmlFor="email">Email</label>
                        <span className="red-text">
                            {errors.email}
                            {errors.emailnotfound}
                        </span>
                    </div>
                    <div className="input-field col-s-12">
                        <input
                            onChange={this.handleChange}
                            value={this.state.password}
                            error={errors.password}
                            name="password"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password || errors.passwordincorrect
                            })}
                        />
                        <label htmlFor="password">Password</label>
                        <span className="red-text">
                            {errors.password}
                            {errors.passwordincorrect}
                        </span>
                    </div>
                    <div className="col-s-12">
                        <button type="submit" className="customBtn" >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";


class Header extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    renderContent() {
        if (this.props.auth.user.name) {
            return (
                <div className="app_header">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">ASK.IT</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-item nav-link" href="/dashboard">My Profile<span className="sr-only">(current)</span></a>
                                <a className="nav-item nav-link" href="/">Home</a>
                                <a className="nav-item nav-link" href="/register" onClick={this.onLogoutClick} >Logout</a>
                                <p className="headerInfo">You are logged in as {this.props.auth.user.name}</p>
                            </div>
                        </div>
                    </nav>
                </div>
                );
        } else {
            return (
                <div className="app_header">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">ASK.IT</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-item nav-link" href="/login">Login<span className="sr-only">(current)</span></a>
                                <a className="nav-item nav-link" href="/register">Sign In</a>
                            </div>
                        </div>
                    </nav>
                </div>
                );
        }
    }

    render() {
        return (
        <div>
                {this.renderContent()}
        </div>
        );
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);

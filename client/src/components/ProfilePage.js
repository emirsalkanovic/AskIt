import React, { Component } from 'react';

class ProfilePage extends Component {
    render() {
        return (
            <div className="questionPage">
                <p>Profile: {this.props.user[0].user}</p>
                <p>Number of Questions: {this.props.user.length}</p>
                <button onClick={this.props.close} className="customBtn"> 
                    Close
                </button>
            </div>
            );
    }
}

export default ProfilePage;
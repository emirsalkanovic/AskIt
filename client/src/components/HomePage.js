import React, { Component } from 'react';
import '../App.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PeoplePopular from './PeoplePopular';
import QuestionLatest from './QuestionLatest';
import QuestionPopular from './QuestionPopular';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            intervalIsSet: false,
            data: null,
            questions: [],
            users: [],
        }
    }

   async componentDidMount() {
       await this.getDataFromDb()
       if (!this.state.intervalIsSet) {
           let interval = setInterval(this.getDataFromDb, 1000);
           this.setState({ intervalIsSet: interval });
       }
      await  this.getUserFromDb()
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
           .catch(err => console.log(err));
       
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    getDataFromDb = async () => {
        await fetch('http://localhost:5000/api/getData')
            .then((data) => data.json())
            .then((res) => this.setState({ questions: res.data }))
    }

    getUserFromDb = async () => {
        await fetch("http://localhost:5000/api/users/users")
            .then((users) => users.json())
            .then((res) => this.setState({users: res.users}))
    }

    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    render() {
        return (
            <div className="App">
                
                <div className="app_content">
                    <div className='row'>
                        <div className='col'>
                            <QuestionLatest
                                data={this.state.questions}
                                user={this.props.auth.user.name}
                            />
                        </div>
                        <div className='col'>
                            <QuestionPopular
                                data={this.state.questions}
                                user={this.props.auth.user.name}
                            />
                        </div>
                        <div className='col'>
                            <PeoplePopular
                                users={this.state.users}
                                questions={this.state.questions}
                            />
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}

HomePage.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(HomePage);
    
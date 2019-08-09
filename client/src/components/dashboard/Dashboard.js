import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import QuestionPage from "../QuestionPage";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            intervalIsSet: false,
            selectedQuestion: null,
            data: [],
            message: "",
            showQuestion: false
        }

        this.onChange = this.onChange.bind(this);
        this.putDataToDB = this.putDataToDB.bind(this);
        this.getDataFromDb = this.getDataFromDb.bind(this);
        this.closeQuestion = this.closeQuestion.bind(this);
        this.selectQuestion = this.selectQuestion.bind(this);
    }
    

     componentDidMount() {
         this.getDataFromDb();
         if (!this.state.intervalIsSet) {
             let interval = setInterval(this.getDataFromDb, 1000);
             this.setState({ intervalIsSet: interval });
         }
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    getDataFromDb = () => {
        fetch('http://localhost:5000/api/getData')
            .then((data) => data.json())
            .then((res) => this.setState({ data: res.data}))
    }

    putDataToDB() {
        const question = {
            user: this.props.auth.user.name,
            message: this.state.message
        }
       
        axios.post("http://localhost:5000/api/putData", question)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        this.setState({
            message: "",
        })
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    selectQuestion = (e, question) => {
        this.setState({
            selectedQuestion: question,
            showQuestion:true
        })
    }

    closeQuestion() {
        this.setState({
            showQuestion: false,
            selectedQuestion: null
        })
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        let allQuestion = this.state.data
        let userQuestion = []
        
        allQuestion.map(question => {
            if (question.user === this.props.auth.user.name) {
                userQuestion.push(question)
            }
        })
        
        const { user } = this.props.auth;
        return (
            <div className="container myPage">
                <div className="row">
                    <div className="col-s-12">
                        <h4>
                            <b>Hey there,</b> {user.name.split(" ")[0]}
                            <p>Please submit your quesiton to continue</p>
                        </h4>
                    </div>
                </div>
                    <div className='row'>
                        <input className="col" name='message' type='text' onChange={(e) => this.onChange(e)} value={this.state.message} />
                        <label className="col" htmlFor="message">Question text</label>
                    </div>
                    <div className="row">
                            <button className="col customBtn" onClick={this.putDataToDB} >Submit</button>
                    </div>
                <div className="myQuestions">
                    <h3>All your questions:</h3>
                    <ul className="scrollit">
                        {userQuestion.map(question => {
                            return (
                                <li onClick={(e) => this.selectQuestion(e, question)}>
                                        {question.message}
                                </li>)
                        })}
                    </ul>
                    {this.state.showQuestion ? 
                        <div>
                            <QuestionPage
                                data={this.state.selectedQuestion}
                                close={this.closeQuestion}
                                user={this.props.auth.user.name}
                            />
                            <div className="ui-widget-overlay" />
                        </div>
                        : null}
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
import React, { Component } from 'react';
import QuestionPage from "./QuestionPage";

class QuestionLatest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedQuestion: null,
            showQuestion: false,
            loadMore: false
        }

        this.selectQuestion = this.selectQuestion.bind(this);
        this.closeQuestion = this.closeQuestion.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    selectQuestion = (e, question) => {
        this.setState({
            selectedQuestion: question,
            showQuestion: true
        })
    }

    closeQuestion() {
        this.setState({
            showQuestion: false,
            selectedQuestion: null
        })
    }

    handleLoadMore() {
        this.setState({
            loadMore: true
        })
    }

    render() {
        let sorted = []
        sorted = this.props.data.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return (
            <div>
                <h3>Latest Questions</h3>
                <ul>
                    {sorted.map(question => {
                        return (
                            <li onClick={(e) => this.selectQuestion(e, question)} >
                                {question.message}
                            </li>
                        );
                    })}
                </ul>
                {!this.state.loadMore ?
                    <button className="customBtn" onClick={this.handleLoadMore}>Load more...</button>
                    : null}
                {this.state.showQuestion ?
                    <div>
                        <QuestionPage
                            data={this.state.selectedQuestion}
                            close={this.closeQuestion}
                            user={this.props.user}
                        />
                        <div className="ui-widget-overlay" />
                    </div>
                    : null}
            </div>
        );
    }
}

export default QuestionLatest;
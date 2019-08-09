import React, { Component } from 'react';
import QuestionPage from "./QuestionPage";

class QuestionPopular extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedQuestion: null,
            showQuestion: false,
            loadMore: false
        }
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.selectQuestion = this.selectQuestion.bind(this);
        this.closeQuestion = this.closeQuestion.bind(this);
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
        let data = []
        data = this.props.data
        data.sort((a, b) => { return b.likes.length - a.likes.length })
        if (this.state.loadMore === false) {
            data.slice(0, 9)
        } 
        return (
            <div>
                <h3>Hot Questions</h3>
            <ul>
                {data.map((question, key) => {
                    return (
                        <li onClick={(e) => this.selectQuestion(e, question)}>
                            <span>{question.message}</span>
                            <p className="hotQuestion">- Likes:</p><span className="like">{question.likes.length}</span><span className="unlike">{question.unlikes.length}</span>
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

export default QuestionPopular;
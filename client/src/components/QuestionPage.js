import React, { Component } from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class QuestionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            disableLike: false,
            diableUnlike: false,
        }

        this.onChange = this.onChange.bind(this);
        this.putCommentToDB = this.putCommentToDB.bind(this);
        this.putLikeToDB = this.putLikeToDB.bind(this);
        this.putUnlikeToDB = this.putUnlikeToDB.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }

    onChange = (e) => {
        e.preventDefault();
        const comment = e.target.value
        this.setState({
            comment: comment
        })
    }

    putCommentToDB = (e) => {
        e.preventDefault();
        
        const message = this.state.comment
        const comment = {
            author: this.props.user,
            text: message,
            id: this.props.data._id
        }

        this.sendComment(comment);
        this.props.close();
    }

    async sendComment(comment) { 
       await axios.post("/api/putComment", comment)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        
    }

    putLikeToDB = (e) => {
        const like = {
            id: this.props.data._id,
            like: 'like'
        };
        

        axios.post("/api/putLike", like)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    putUnlikeToDB =(e) => {
        const unlike = {
            id: this.props.data._id,
            unlike: "unlike"
        };
        axios.post("/api/putUnlike", unlike)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }



        
    render() {
        return (
            <div className="questionPage">
                <p>Question text: <span>{this.props.data.message}</span></p>
                <p>Created by: <span>{this.props.data.user}</span></p>
                <p>Published: <span>{this.props.data.createdAt.slice(0, 10)}</span>  <span>{this.props.data.createdAt.slice(11,16)}</span></p>
                {this.props.auth.user.name ?
                    <div className="likeButtons">
                        <button className="like" onClick={this.putLikeToDB} ><i className="fa fa-thumbs-up"></i></button>
                        <button className="unlike" onClick={this.putUnlikeToDB} ><i className="fa fa-thumbs-down"></i></button>
                    </div>
                    : null
                }
                <ul className="scrollit">
                    {this.props.data.comments.map((comment) => {
                        return (
                            <li><span>{comment.text}</span>  <p>Author: <span>{comment.author}</span></p></li>
                        );
                    })}
                </ul>
                {this.props.auth.user.name ?
                    <div>
                        <label htmlFor="comment">Leave a comment!</label>
                        <input onChange={(e) =>this.onChange(e)} type="text" name="comment" value={this.state.comment} />
                        <div className="questionButtons">
                            <button onClick={this.props.close} className="customBtn">
                                Close
                            </button>
                            <button className="customBtn" onClick={this.putCommentToDB}>
                                Add Commnent
                            </button>
                        </div>
                    </div>
                    : 
                    <button onClick={this.props.close} className="customBtn">
                        Close
                    </button>
                    }
            </div>
            );
    }
}

QuestionPage.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(QuestionPage);

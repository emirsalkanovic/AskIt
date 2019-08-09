import React, { Component } from 'react';
import ProfilePage from './ProfilePage';

class PeoplePopular extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadMore: false,
            names: this.props.users,
            question: this.props.questons,
            selectedPeople: null,
            showProfile: false,
        }

        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.selectPeople = this.selectPeople.bind(this);
        this.closeProfile = this.closeProfile.bind(this);
    }

    handleLoadMore() {
        this.setState({
            loadMore: true
        })
    }

    selectPeople = (e, man) => {
        this.setState({
            selectedPeople: man,
            showProfile: true
        })
    }

    closeProfile() {
        this.setState({
            showProfile: false,
            selectedPeople: null
        })
    }

    render() {
        let names = []
        names = this.props.users
        let question = []
        question = this.props.questions

        let popularPeople = []

        for(let i = 0; i < names.length; i++) {
            popularPeople[i] = question.filter(item => item.user === names[i].name)
        }

        popularPeople.sort((a, b) => b.length - a.length)


        let users = []
        if (this.state.loadMore === false) {
            users = popularPeople.slice(0, 19)
        } else {
            users = popularPeople
        }

        return (
            <div>
                <h3>Popular Users</h3>
            <ul>
                {popularPeople.map((man, key) => {
                    return (
                        <li onClick={(e) => this.selectPeople(e, man)} >{man[0].user}</li>
                    );
                })
                }
            </ul>
                {!this.state.loadMore ?
                    <button className="customBtn" onClick={this.handleLoadMore}>Load more...</button>
                    : null}
                {this.state.showProfile ?
                    <div>
                        <ProfilePage
                            close={this.closeProfile}
                            user={this.state.selectedPeople}
                        />
                        <div className="ui-widget-overlay" />
                    </div>
                    : null}
            </div>
            );
    }
}

export default PeoplePopular;
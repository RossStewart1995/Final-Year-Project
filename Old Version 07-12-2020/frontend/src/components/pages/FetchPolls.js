import React from "react";
import axios from "axios";

export default class FetchPolls extends React.Component{
    state = {
        polls: [],
    };

    componentDidMount(){

        axios.get("http://localhost:5000/polls/get_all_polls_and_choices").then(res => {
            this.setState(res.data);
            //console.log(res.data);
        })
    }

    render() {
        return (
            <div>
                {this.state.polls.map((poll, index) => {
                    return (
                    <ul key = {index}>
                        <h3 className="poll-title">Title: {poll.title}</h3>
                        <p className="poll-para">Poll_ID: {poll.poll_id}</p>
                        <p className="poll-para">Description: {poll.description}</p>
                        {poll.choices.map((choice, i) => {
                            return(
                                    <p key= {i} className="poll-choice">{choice.name}:{choice.id}</p>
                            )  
                        })}
                    </ul>
                    )
                })}
                </div>
                
        )
    }
};



import React, {useState, useEffect} from 'react'
import axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function ViewPolls() {
    const [data, setPolls] = useState(
        {
            polls: []}
        );

    const [error, setError] = useState();
    const [voteData, setVoteData] = useState({});

useEffect(() => {
    (async () => {
      try {
        axios.get("http://localhost:5000/polls/get_all_polls_and_choices").then(res => {
            setPolls(res.data);
    	});
      }catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          // handle error
          console.log(error);
        }
      }
    })();
    return () => {
      //when the component unmounts
      console.log("component unmounted");
      // cancel the request (the message parameter is optional)
    }
}, []); //End UseEffect

const handleOnClick = (e) => {
    const choice_id = e.target.value;
    const user_id = localStorage.getItem("user-id")

    setVoteData({choice_id, user_id})
    };

        

const submitVote = async () => {
    console.log(voteData)
    try{
        const pollResponse = await axios.post(
            "http://localhost:5000/polls/store_poll_result",
            {voteData}
        );

        console.log({
            poll_id: pollResponse.data._id,
        });

    }catch(err){
        err.response.data.msg && setError(err.response.data.msg);
    };
}


    return (
        <div>
            <h1 >View Current Polls</h1>
            {data.polls.map((poll, index) => {
                    return (
                    <ul key = {index}>
                        {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)}/>
                         )}
                        <h3 className="poll-title">Title: {poll.title}</h3>
                        <p className="poll-para">Poll_ID: {poll.poll_id}</p>
                        <p className="poll-para">Description: {poll.description}</p>
                        <p>Choices:  
                        <select value={poll._id} onClick={handleOnClick}> 
                        {poll.choices.map((choice, i) => {
                            return(
                                <option key= {i} 
                                value={choice.id}
                                defaultValue=""
                                className="poll-choice" >{choice.name}</option>
                            )  
                        })}
                        </select>
                        <input type="submit" value="Submit" onClick={submitVote}></input>
                        </p>
                    </ul>
                    )
                })}
            </div>
    )
}

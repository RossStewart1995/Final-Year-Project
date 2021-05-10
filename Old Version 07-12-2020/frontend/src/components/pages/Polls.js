import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";



export default function Poll() {
    //state variables to hold poll details
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    //poll choices
    const [inputList, setInputList] = useState([
        {choicesName: ""}
    ]);

    const history = useHistory();
    const [error, setError] = useState();

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            history.push("/login");
        }
    });


    //multiple choice fields
    const handleChange = (e, index) => {
        const {name, value} = e.target;

        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    const handleAddInput = () => {
        setInputList([...inputList, {choicesName: ""}]);
    }
    const handleRemoveInput = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }

    //function to backend to create poll
    const submitPollDetails = async (e) => {
        e.preventDefault();

        try{
        const newPoll = await Axios.post(
            "http://localhost:5000/polls/createpoll",    
            {title, description}       
        );
        
        const poll_id = newPoll.data._id;

        const details = inputList.map((item, i) => {
            let orderNum = i+1;
            console.log(orderNum)
            return (submitPollChoices(poll_id, item.choicesName, orderNum))
        });

        console.log(details);

        history.push("/");
        }catch(err){
            err.response.data.msg && setError(err.response.data.msg);
        };
    };

    const submitPollChoices = async (poll_id, choiceName, orderNum) => {

        await Axios.post(
            "http://localhost:5000/polls/poll_choices",
            {poll_id, choiceName, orderNum}
        );
    };

    return (
        <div className="poll-page">
            <h2>Create a New Poll</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)}/>
            )}
                <input type="text"
                name="Title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                />
                <input type="text"
                name="Description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                />

                {inputList.map((item,i) => {
                    return(
                    <div key ={i}className="input-box" >
                        
                        <input type="text"
                            name="choicesName"
                            placeholder="Choice Name"
                            className="i10"
                            value={item.choicesName}
                            onChange={e => handleChange(e, i)}
                        />
                        
                        {inputList.length !== 1 && <input
                            type="button"
                            value="   -   "
                            className="remove-input"
                            onClick={() => handleRemoveInput(i)}
                        />}
                        {inputList.length - 1 === i && <input 
                            type="button"
                            value="   +   "
                            className="add-input"
                            onClick={handleAddInput}
                        />}
                    </div>
                    )})}

                <input type="submit" value="Submit" onClick={submitPollDetails}/>
        </div>
    )
}
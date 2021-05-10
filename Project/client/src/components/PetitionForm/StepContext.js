import React, {useState, useEffect} from 'react';
import PetitionForm from "./PetitionForm";
import {createPetitionNew} from "../../actions/petitions";
import bkg2 from "../../images/bkg2.png";
import {CLEAR} from "../../constants/actionTypes";
import {useHistory} from "react-router-dom";
import { useSnackbar } from 'notistack';
import {useDispatch} from "react-redux";


export const multiStepContext = React.createContext();


const StepContext = () => {
    const [currentStep, setStep] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const user = JSON.parse(localStorage.getItem("profile"));
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        recipient: "",
        topic: "",
        image: bkg2
    });

    const [finalData, setFinalData] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(!localStorage.getItem("profile")){
            dispatch({type: CLEAR});
            history.push("/auth");
        } 
    }, [currentStep, formData, dispatch, history])

    const submitData = () => {
        console.log(formData)
        if(formData.title === "" || formData.topic === ""){
            enqueueSnackbar(`Some fields remain empty, please ensure all fields have been filled in.`, {
                variant: 'error'
            });
            setStep(0);
        }else{
            dispatch(createPetitionNew({...formData, username: user?.result?.name})).then(() => {
                enqueueSnackbar("New Petition Created. Thank you!", {
                    variant: 'success'
                });
            }).catch((error) => {
                enqueueSnackbar(`Error With Petition Creation!`, {
                    variant: 'error'
                });
                throw error;
            })
            clear();
        }
    }

    const clear = () => {
        setFormData({title: "", message: "", recipient: "", topic: "", image: ""});
        setStep(0);
    }

    return (
        <div>
            <multiStepContext.Provider value={{currentStep, setStep, formData, setFormData, finalData, setFinalData, submitData}}>
                <PetitionForm />
            </multiStepContext.Provider>
        </div>
    )
}

export default StepContext

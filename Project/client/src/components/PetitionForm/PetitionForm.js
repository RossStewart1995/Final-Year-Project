import React, {useContext, useEffect} from 'react';
import {Stepper, Step, StepLabel, Grow} from "@material-ui/core";
import useStyles from "./styles";
import {multiStepContext} from "./StepContext";
import {useDispatch} from "react-redux";
import {CLEAR} from "../../constants/actionTypes";
import {useHistory} from "react-router-dom";


import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepThree from "./StepThree/StepThree";
import StepFour from "./StepFour/StepFour";
import StepFive from "./StepFive/StepFive";
import Preview from "./Preview/Preview";


const PetitionForm = () => {
    const { currentStep } = useContext(multiStepContext);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(!localStorage.getItem("profile")){
            dispatch({type: CLEAR});
            history.push("/auth");
        } 
    }, [currentStep, dispatch, history])

    const getSteps = () => {
        return ["CHOOSE TOPIC", "CHOOSE TITLE", "SELECT RECIPIENT", "EXPLAIN PROBLEM", "ADD PHOTO"]
    }
    const steps = getSteps();


    const getStepContent = (stepIndex) => {
        switch(stepIndex){
            case 0:
                return <StepOne/>
            case 1:
                return <StepTwo/>
            case 2: 
                return <StepThree/>
            case 3: 
                return <StepFour/>
            case 4:
                return <StepFive/>
            case 5:
                return <Preview/>
            default: return "Unknown Step";
        }
    }


    return (
        <Grow in>
        <div className={classes.root}>
            <Stepper  className={classes.stepper} activeStep={currentStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
            {getStepContent(currentStep)}
            </>            
        </div>

        
        </Grow>
    )
}

export default PetitionForm

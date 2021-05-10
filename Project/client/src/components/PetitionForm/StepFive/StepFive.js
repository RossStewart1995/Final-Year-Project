import React, {useContext} from 'react'
import {Typography, Button, Paper} from "@material-ui/core";
import useStyles from "./styles";
import FileBase from "react-file-base64";

import {multiStepContext} from "../StepContext";

import bkg2 from "../../../images/bkg2.png";

const StepFive = () => {
    const classes = useStyles();
    const {setStep, formData, setFormData} = useContext(multiStepContext);

    return (
        <div>
            <Paper>
                <Typography className={classes.heading} variant="h3">Add a Photo</Typography>
                <Typography className={classes.heading} variant="h6">Add an image to help your petition stand out from the crowd</Typography>

                
                <img className={classes.petitionImage} alt="Petition" src={formData.image ? formData.image : bkg2}/>
                
                <form className={classes.form}>

                    <div className={classes.title}>
                    <FileBase  type="file" multiple={false} onDone={({base64}) => setFormData({...formData, image: base64})}/>
                    </div>
                    
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => setStep(3)}>Back</Button>
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => setStep(5)}>Preview</Button>
                </form>
            </Paper>
        </div>
    )
}


export default StepFive

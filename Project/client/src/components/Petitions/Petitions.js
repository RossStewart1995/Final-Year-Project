import React from 'react';
import Petition from "./Petition/Petition";
import {useSelector} from "react-redux";
import useStyles from "./styles";

import {Grid, CircularProgress} from "@material-ui/core";

const Petitions = ({setCurrentPetitionID, setIsSigning, isSigning}) => {
    const petitions = useSelector((state) => state.petitions);
    const classes = useStyles();

    return (
        !petitions.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={1} >
                {petitions.map((petition) => (
                    <Grid key={petition._id} item xs={12} sm={6}>
                        <Petition formData={petition} setCurrentPetitionID={setCurrentPetitionID} setIsSigning={setIsSigning} isSigning={isSigning}/>
                    </Grid>
                ))}

            </Grid>
        )
    )
}

export default Petitions

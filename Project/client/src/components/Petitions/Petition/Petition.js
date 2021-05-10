import React, {useEffect} from 'react'
import {Typography, Button, Card} from "@material-ui/core";
import useStyles from "./styles";
import moment from "moment";

import bkg2 from "../../../images/bkg2.png";

import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Petition = ({formData, setIsSigning, setCurrentPetitionID, isSigning}) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const classes = useStyles();
    const petitionIndex = formData.signatures.findIndex((obj) => obj.userid === user?.result?._id);

    const [expanded, setExpanded] = React.useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        console.log(formData.title)
        console.log(petitionIndex);

    }, [formData, petitionIndex, isSigning])

    const handleSignatureNavigation = () => {
        console.log("Button Pressed")
        console.log(formData._id)
        setCurrentPetitionID(formData._id);
        setIsSigning(true);
    }

    return (
        <Card className={classes.root} variant="outlined">
                    <CardHeader                        
                        title={formData.title}
                        subheader={`${user?.result?.name} created this petition on: ${moment(formData.createdAt).format("DD-MM-YYYY")}`}
                    />

                    <CardMedia
                        className={classes.media}
                        image={formData.image ? formData.image : bkg2}
                    />
                    <CardHeader                        
                        subheader={`Total Number of Signatures: ${formData.signatures.length}`}
                    />

                    <CardContent>
                    {/* <Typography variant="body1">Total Number of signatures: {formData.signatures.length}</Typography> */}

                    {petitionIndex === -1 ? (
                    <Button className={classes.signButton} variant="contained" onClick={() => handleSignatureNavigation()}>Sign Petition</Button>) : (
                        <Typography>You have signed this petition. Thank you!</Typography>
                    )}
                    
                    </CardContent>

                    <CardActions disableSpacing>
                    <Typography variant="body2" color="textSecondary" component="p">Press the arrow for more details.</Typography>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            label="Details"
                        >


                            <ExpandMoreIcon/>
                        </IconButton>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>{formData.message}</Typography>
                        </CardContent>
                    </Collapse>

                </Card>
    )
}

export default Petition

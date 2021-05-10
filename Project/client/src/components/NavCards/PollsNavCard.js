import React from 'react'
import polls from '../../images/polls_2.png';
import useStyles from "./styles";
import {Card, CardContent, Typography, CardMedia, Button} from '@material-ui/core'
import {useHistory} from "react-router-dom";


const PollsNavCard = (title) => {
    const classes = useStyles();
    const history = useHistory();

    const handleNavigation = () => {
        history.push("/poll");
    }

    return (
        <>
        <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                Quick Link:
          </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Polls
          </Typography>
                        </CardContent>
                            <Button onClick={handleNavigation}>Take me there</Button>
                        
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image={polls}
                    />
            </Card>
        </>
    )
}

export default PollsNavCard

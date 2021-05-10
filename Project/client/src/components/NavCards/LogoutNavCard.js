import React from 'react'
import logout from '../../images/logout.png';
import useStyles from "./styles";
import {Card, CardContent, Typography, CardMedia, Button} from '@material-ui/core'
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LOGOUT} from "../../constants/actionTypes";


const LogoutNavCard = (title) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()

    const handleNavigation = () => {
        dispatch({type: LOGOUT});
        history.push("/auth");
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
                                Log Out
          </Typography>
                        </CardContent>
                            <Button onClick={handleNavigation}>Take me there</Button>
                        
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image={logout}
                    />
            </Card>
        </>
    )
}

export default LogoutNavCard

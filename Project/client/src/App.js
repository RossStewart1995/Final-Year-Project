import React from "react";
import {Container} from "@material-ui/core";

import Navbar2 from "./components/Navbar/NavBarfix.js";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PollHome from "./components/Home/PollHome";
import Account from "./components/Account/Account";
import Petition from "./components/PetitionForm/PetitionForm";
import PetitionsHome from "./components/Home/PetitionsHome";

import StepContext from "./components/PetitionForm/StepContext";

import {BrowserRouter, Switch, Route} from "react-router-dom";
import Slide from '@material-ui/core/Slide';

import {SnackbarProvider} from 'notistack';

const App = () => {
    return (
        
        <BrowserRouter>
        <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    TransitionComponent={Slide}>
        <Navbar2 />
        <Container className="container" maxWidth="lg">
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
                <Route path="/poll" exact component={PollHome}/>
                <Route path="/account" exact component={Account}/>
                <Route path="/getpetitions" exact component={PetitionsHome} />
                <StepContext>
                <Route path="/petition" exact component={Petition}/>
                </StepContext>
            </Switch>
        </Container>
        </SnackbarProvider>
        </BrowserRouter>
    );
}

export default App;
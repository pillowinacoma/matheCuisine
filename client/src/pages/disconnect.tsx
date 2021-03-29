import * as React from 'react';
import { Button, TextField } from '@material-ui/core';
import {LangContext} from '../engine/translation/i18n';
import {UserContext} from '../engine/profile/profile';
import {Link} from 'react-router-dom';


const Disconnection = () => {

    const {translate} = React.useContext(LangContext);
    const {deleteLogin} = React.useContext(UserContext);

    const [login, setLogin] = React.useState("");
    const [error, setError] = React.useState("");
    
    const handleConnexion = () => {
        deleteLogin();
    }

    return (
        <div>
            <h1>{translate("toDisconnect")}</h1>
            <Button variant="contained" color="primary" onClick={handleConnexion} component={Link} to='/'>
                {translate('clickHere')}
            </Button>
        </div>
    );

}

export default Disconnection;
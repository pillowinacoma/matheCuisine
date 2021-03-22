import * as React from 'react';
import { Button, TextField } from '@material-ui/core';
import {LangContext} from '../engine/translation/i18n';


const Disconnection = () => {

    const {translate} = React.useContext(LangContext);

    const [login, setLogin] = React.useState("");
    const [error, setError] = React.useState("");
    
    const handleConnexion = () => {

    }

    return (
        <div>
            <h1>{translate("toDisconnect")}</h1>
            <Button variant="contained" color="primary" onClick={handleConnexion}>
                {translate('clickHere')}
            </Button>
        </div>
    );

}

export default Disconnection;